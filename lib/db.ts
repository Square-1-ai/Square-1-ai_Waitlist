import mysql from 'mysql2/promise';

const connectionUrl = process.env.RAILWAY_DB_URL;

if (!connectionUrl) {
  throw new Error('RAILWAY_DB_URL environment variable is required');
}

const pool = mysql.createPool({
  uri: connectionUrl,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export async function query(sql: string, params?: any[]) {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

const cleanup = async () => {
  try {
    await pool.end();
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
