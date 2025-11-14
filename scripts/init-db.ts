import { query } from '../lib/db';

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
  consent BOOLEAN,
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
  early_access TEXT,
  consent BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

async function initDatabase() {
  try {
    console.log('Creating students table...');
    await query(studentTableSQL);
    console.log('✓ Students table created');

    console.log('Creating teachers table...');
    await query(teacherTableSQL);
    console.log('✓ Teachers table created');

    console.log('\n✅ Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initDatabase();
