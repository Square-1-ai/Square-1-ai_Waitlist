require('dotenv').config();

const mysql = require('mysql2/promise');

const connectionUrl = process.env.RAILWAY_DB_URL;

if (!connectionUrl) {
  console.error('❌ RAILWAY_DB_URL environment variable is not set');
  console.error('Please add RAILWAY_DB_URL to your .env file');
  process.exit(1);
}

const studentTableSQL = `
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
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
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
      uri: connectionUrl,
    });

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
    console.error('\nPlease check:');
    console.error('1. Database connection string in .env (RAILWAY_DB_URL)');
    console.error('2. Database server is running');
    console.error('3. Database credentials are correct');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initDatabase();
