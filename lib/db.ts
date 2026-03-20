import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
  if (pool) return pool;

  const dbUrl = process.env.DATABASE_URL;

  if (dbUrl) {
    pool = mysql.createPool({
      uri: dbUrl,
      waitForConnections: true,
      connectionLimit: 25,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      connectTimeout: 10000,
    });
  } else {
    if (!process.env.GCP_DB_HOST) {
      throw new Error('DATABASE_URL or GCP_DB_HOST must be set in environment variables');
    }

    pool = mysql.createPool({
      host: process.env.GCP_DB_HOST,
      port: parseInt(process.env.GCP_DB_PORT || '3306'),
      user: process.env.GCP_DB_USER || 'root',
      password: process.env.GCP_DB_PASSWORD,
      database: process.env.GCP_DB_NAME,
      waitForConnections: true,
      connectionLimit: 25,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      connectTimeout: 10000,
      ssl: { rejectUnauthorized: false },
    });
  }

  return pool;
}

export async function query(sql: string, params?: any[]) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const db = getPool();
      const [rows] = await db.query(sql, params);
      return rows;
    } catch (error: any) {
      const isRetryable =
        error.code === 'ECONNRESET' ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'PROTOCOL_CONNECTION_LOST' ||
        error.message?.includes('Connection lost') ||
        error.message?.includes('Pool is closed');

      if (isRetryable && attempt < MAX_RETRIES) {
        console.warn(`Database query failed (attempt ${attempt}/${MAX_RETRIES}), retrying...`, error.code || error.message);

        pool = null;

        // Exponential backoff: 500ms, 1000ms
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
        continue;
      }

      console.error('Database query error:', error);
      throw error;
    }
  }
}

const cleanup = async () => {
  try {
    if (pool) {
      await pool.end();
      pool = null;
    }
    console.log('Database connection pool closed');
  } catch (error) {
    console.error('Error closing database pool:', error);
  }
};

process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);

if (process.env.NODE_ENV === 'development') {
  if ((global as any).__db_pool_cleanup) {
    (global as any).__db_pool_cleanup();
  }
  (global as any).__db_pool_cleanup = cleanup;
}
