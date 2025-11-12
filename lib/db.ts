import mysql from 'mysql2/promise';

// Parse the connection URL properly
const connectionUrl = process.env.RAILWAY_DB_URL || 'mysql://root:password@localhost:3306/waitlist';

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
