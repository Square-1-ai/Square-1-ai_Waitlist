import { Connector } from '@google-cloud/cloud-sql-connector';
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;
let connector: InstanceType<typeof Connector> | null = null;

async function getPool(): Promise<mysql.Pool> {
  if (pool) return pool;

  // Validate required env vars before attempting connection
  if (!process.env.GCP_SERVICE_ACCOUNT_KEY) {
    throw new Error('GCP_SERVICE_ACCOUNT_KEY is not set in environment variables');
  }
  if (!process.env.GCP_INSTANCE_CONNECTION_NAME) {
    throw new Error('GCP_INSTANCE_CONNECTION_NAME is not set in environment variables');
  }

  const credentials = JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY);

  connector = new Connector();

  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.GCP_INSTANCE_CONNECTION_NAME,
    ipType: 'PUBLIC',
    authOptions: { credentials },
  });

  pool = mysql.createPool({
    ...clientOpts,
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
  });

  return pool;
}

export async function query(sql: string, params?: any[]) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const db = await getPool();
      const [rows] = await db.query(sql, params);
      return rows;
    } catch (error: any) {
      const isRetryable =
        error.code === 'ECONNRESET' ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'PROTOCOL_CONNECTION_LOST' ||
        error.code === 'ENOSQLADMINIPADDRESS' ||
        error.message?.includes('Connection lost');

      if (isRetryable && attempt < MAX_RETRIES) {
        console.warn(`Database query failed (attempt ${attempt}/${MAX_RETRIES}), retrying...`, error.code || error.message);

        // Reset pool on connection errors so a fresh one is created
        if (pool) {
          try { await pool.end(); } catch (_) { /* ignore */ }
          pool = null;
        }
        if (connector) {
          try { connector.close(); } catch (_) { /* ignore */ }
          connector = null;
        }

        // Exponential backoff: 500ms, 1500ms
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
    if (connector) {
      connector.close();
      connector = null;
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
