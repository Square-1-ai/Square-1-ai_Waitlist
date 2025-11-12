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
      // Insert teacher data
      await query(
        `INSERT INTO teachers (
          full_name, email, country, city, internet_connection, devices, 
          heard_about, subjects, teaching_level, years_experience, 
          class_type_preference, taught_online, platforms_used, curriculums, 
          create_study_packs, availability_to_start, revenue_split, 
          payment_method, teaching_sample, early_access, consent
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
          sanitizeString(data.teachingSample),
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
