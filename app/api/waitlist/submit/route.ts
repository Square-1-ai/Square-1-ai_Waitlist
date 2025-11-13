import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate email format
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

// Sanitize string input
function sanitizeString(input: string | undefined | null): string {
  if (!input) return '';
  return String(input).trim().slice(0, 500); // Limit length
}

function validateStudent(data: any): { valid: boolean; error?: string } {
  if (!data.fullName || sanitizeString(data.fullName).length < 2) {
    return { valid: false, error: 'Full name is required (minimum 2 characters)' };
  }
  if (!data.email || !isValidEmail(data.email)) {
    return { valid: false, error: 'Valid email is required' };
  }
  if (!data.consent) {
    return { valid: false, error: 'Consent is required' };
  }
  return { valid: true };
}

function validateTeacher(data: any): { valid: boolean; error?: string } {
  if (!data.fullName || sanitizeString(data.fullName).length < 2) {
    return { valid: false, error: 'Full name is required (minimum 2 characters)' };
  }
  if (!data.email || !isValidEmail(data.email)) {
    return { valid: false, error: 'Valid email is required' };
  }
  if (!data.consent) {
    return { valid: false, error: 'Consent is required' };
  }
  return { valid: true };
}

export async function POST(req: NextRequest) {
    // Table creation SQLs (copied from migration script)
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
  try {
    // Parse request body
    const body = await req.json();
    const { type, data } = body;

    // Validate type
    if (type !== 'student' && type !== 'teacher') {
      return NextResponse.json(
        { error: 'Invalid submission type' },
        { status: 400 }
      );
    }

    // Validate data based on type
    const validation = type === 'student' 
      ? validateStudent(data) 
      : validateTeacher(data);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Sanitize email
    const sanitizedEmail = sanitizeString(data.email).toLowerCase();

    if (type === 'student') {
      // Ensure students table exists
      await query(studentTableSQL);
      // Insert student data
      await query(
        `INSERT INTO students (
          full_name, email, country, city, internet_connection, devices, 
          heard_about, education_level, subjects, learning_preference, 
          taken_online_courses, why_interested, motivation, competitions, 
          hours_per_week, willing_to_pay, referral_code, early_access, consent
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          sanitizeString(data.fullName),
          sanitizedEmail,
          sanitizeString(data.country),
          sanitizeString(data.city),
          sanitizeString(data.internetConnection),
          JSON.stringify(data.devices || []),
          sanitizeString(data.heardAbout),
          sanitizeString(data.educationLevel),
          JSON.stringify(data.subjects || []),
          sanitizeString(data.learningPreference),
          sanitizeString(data.takenOnlineCourses),
          JSON.stringify(data.whyInterested || []),
          sanitizeString(data.motivation),
          sanitizeString(data.competitions),
          sanitizeString(data.hoursPerWeek),
          sanitizeString(data.willingToPay),
          sanitizeString(data.referralCode),
          JSON.stringify(data.earlyAccess || []),
          !!data.consent
        ]
      );
    } else {
      // Ensure teachers table exists
      await query(teacherTableSQL);
      // Insert teacher data
      await query(
        `INSERT INTO teachers (
          full_name, email, country, city, internet_connection, devices, 
          heard_about, subjects, teaching_level, years_experience, 
          class_type_preference, taught_online, platforms_used, curriculums, 
          create_study_packs, availability_to_start, revenue_split, 
          payment_method, early_access, consent
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          sanitizeString(data.fullName),
          sanitizedEmail,
          sanitizeString(data.country),
          sanitizeString(data.city),
          sanitizeString(data.internetConnection),
          JSON.stringify(data.devices || []),
          sanitizeString(data.heardAbout),
          sanitizeString(data.subjects),
          sanitizeString(data.teachingLevel),
          sanitizeString(data.yearsExperience),
          sanitizeString(data.classTypePreference),
          sanitizeString(data.taughtOnline),
          sanitizeString(data.platformsUsed),
          sanitizeString(data.curriculums),
          sanitizeString(data.createStudyPacks),
          sanitizeString(data.availabilityToStart),
          sanitizeString(data.revenueSplit),
          sanitizeString(data.paymentMethod),
          JSON.stringify(data.earlyAccess || []),
          !!data.consent
        ]
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Successfully added to waitlist!' 
    });

  } catch (error: any) {
    console.error('Waitlist submission error:', error);

    // Handle duplicate email
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'This email is already registered on the waitlist' },
        { status: 409 }
      );
    }

    // Handle other database errors
    return NextResponse.json(
      { error: 'Failed to submit. Please try again later.' },
      { status: 500 }
    );
  }
}
