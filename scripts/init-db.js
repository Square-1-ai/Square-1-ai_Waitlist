require('dotenv').config();

const { Connector } = require('@google-cloud/cloud-sql-connector');
const mysql = require('mysql2/promise');

delete process.env.GOOGLE_APPLICATION_CREDENTIALS;

const connector = new Connector();

const getPool = async () => {
  try {
    const credentials = JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY);

    console.log('📋 Using service account:', credentials.client_email);
    console.log('📋 Instance:', process.env.GCP_INSTANCE_CONNECTION_NAME);

    const clientOpts = await connector.getOptions({
      instanceConnectionName: process.env.GCP_INSTANCE_CONNECTION_NAME,
      ipType: 'PUBLIC',
      authOptions: {
        credentials, 
      },
    });

    return mysql.createPool({
      ...clientOpts,
      user: process.env.GCP_DB_USER || 'root',
      password: process.env.GCP_DB_PASSWORD,
      database: process.env.GCP_DB_NAME,
    });
  } catch (error) {
    console.error('❌ Error creating connection pool:', error.message);
    throw error;
  }
};

if (!process.env.GCP_SERVICE_ACCOUNT_KEY || !process.env.GCP_DB_PASSWORD || !process.env.GCP_DB_NAME || !process.env.GCP_INSTANCE_CONNECTION_NAME) {
  console.error('❌ Missing required environment variables');
  console.error('Please add these to your .env file:');
  console.error('  GCP_INSTANCE_CONNECTION_NAME=project:region:instance');
  console.error('  GCP_SERVICE_ACCOUNT_KEY={"type":"service_account",...}');
  console.error('  GCP_DB_USER=root (optional, defaults to root)');
  console.error('  GCP_DB_PASSWORD=your-db-password');
  console.error('  GCP_DB_NAME=your-db-name');
  process.exit(1);
}

const studentTableSQL = `
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  dob DATE NOT NULL,
  parent_name VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
  internet_connection VARCHAR(100),
  devices TEXT,
  heard_about VARCHAR(100),
  education_level VARCHAR(100),
  subjects TEXT,
  learning_preference VARCHAR(100),
  taken_online_courses VARCHAR(100),
  why_interested TEXT,
  motivation TEXT,
  competitions TEXT,
  hours_per_week VARCHAR(50),
  willing_to_pay VARCHAR(50),
  referral_code VARCHAR(100),
  early_access TEXT,
  data_processing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  newsletter_consent BOOLEAN DEFAULT FALSE,
  consent_timestamp TIMESTAMP NULL,
  consent_ip_address VARCHAR(45) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const teacherTableSQL = `
CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  country VARCHAR(100),
  city VARCHAR(100),
  internet_connection VARCHAR(100),
  devices TEXT,
  heard_about VARCHAR(100),
  subjects VARCHAR(200),
  teaching_level VARCHAR(100),
  years_experience VARCHAR(50),
  class_type_preference VARCHAR(100),
  taught_online VARCHAR(100),
  platforms_used VARCHAR(200),
  curriculums VARCHAR(200),
  create_study_packs VARCHAR(100),
  availability_to_start VARCHAR(100),
  revenue_split VARCHAR(100),
  payment_method VARCHAR(100),
  referral_code VARCHAR(100),
  early_access TEXT,
  data_processing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  newsletter_consent BOOLEAN DEFAULT FALSE,
  consent_timestamp TIMESTAMP NULL,
  consent_ip_address VARCHAR(45) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const feedbackTableSQL = `
CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  country VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  ai_tools_expectation TEXT,
  learning_progress_tracking TEXT,
  course_types TEXT,
  favorite_courses TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

async function initDatabase() {
  let connection;
  try {
    console.log('Connecting to GCP Cloud SQL database...');

    connection = await getPool();

    console.log('✓ Connected to database');
    console.log('Creating students table...');
    await connection.query(studentTableSQL);
    console.log('✓ Students table created');

    console.log('Creating teachers table...');
    await connection.query(teacherTableSQL);
    console.log('✓ Teachers table created');

    console.log('Creating feedback table...');
    await connection.query(feedbackTableSQL);
    console.log('✓ Feedback table created');

    console.log('\nDatabase initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
    connector.close();
  }
}

initDatabase();
