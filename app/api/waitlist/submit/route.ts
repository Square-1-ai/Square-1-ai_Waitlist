import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { waitlistLimiter, getClientIdentifier, formatTimeRemaining } from '@/lib/rate-limiter';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WaitlistData {
  fullName: string;
  email: string;
  country?: string;
  city?: string;
  internetConnection?: string;
  devices?: string[];
  heardAbout?: string;
  // Student specific
  educationLevel?: string;
  subjects?: string[];
  learningPreference?: string;
  takenOnlineCourses?: string;
  whyInterested?: string[];
  motivation?: string;
  competitions?: string;
  hoursPerWeek?: string;
  willingToPay?: string;
  referralCode?: string;
  earlyAccess?: string[];
  // Teacher specific
  teachingLevel?: string;
  yearsExperience?: string;
  classTypePreference?: string;
  taughtOnline?: string;
  platformsUsed?: string;
  curriculums?: string;
  createStudyPacks?: string;
  availabilityToStart?: string;
  revenueSplit?: string;
  paymentMethod?: string;
}

interface SubmitRequest {
  type: 'student' | 'teacher';
  data: WaitlistData;
}

function sanitizeString(input: string | string[] | undefined | null): string {
  if (!input) return '';
  // If input is an array, it will be JSON.stringified elsewhere
  if (Array.isArray(input)) return '';
  // Remove HTML tags and trim
  const cleaned = String(input)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim()
    .slice(0, 500);
  return cleaned;
}

function validateWaitlistData(data: WaitlistData): { valid: boolean; error?: string } {
  if (!data.fullName || sanitizeString(data.fullName).length < 2) {
    return { valid: false, error: 'Full name is required (minimum 2 characters)' };
  }
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return { valid: false, error: 'Valid email is required' };
  }
  return { valid: true };
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientIdentifier(req);
    const rateLimit = waitlistLimiter.check(clientId);

    if (!rateLimit.allowed) {
      const timeRemaining = formatTimeRemaining(rateLimit.resetTime);
      return NextResponse.json(
        { 
          error: `Too many requests. Please try again in ${timeRemaining}.`,
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimit.resetTime),
          }
        }
      );
    }

    const body = await req.json() as SubmitRequest;
    const { type, data } = body;

    if (type !== 'student' && type !== 'teacher') {
      return NextResponse.json(
        { error: 'Invalid submission type' },
        { status: 400 }
      );
    }

    const validation = validateWaitlistData(data);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeString(data.email).toLowerCase();

    // Tables are created once using: npm run db:init
    
    if (type === 'student') {
      await query(
        `INSERT INTO students (
          full_name, email, country, city, internet_connection, devices, 
          heard_about, education_level, subjects, learning_preference, 
          taken_online_courses, why_interested, motivation, competitions, 
          hours_per_week, willing_to_pay, referral_code, early_access
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
          JSON.stringify(data.earlyAccess || [])
        ]
      );
    } else {
      await query(
        `INSERT INTO teachers (
          full_name, email, country, city, internet_connection, devices, 
          heard_about, subjects, teaching_level, years_experience, 
          class_type_preference, taught_online, platforms_used, curriculums, 
          create_study_packs, availability_to_start, revenue_split, 
          payment_method, referral_code, early_access
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
          sanitizeString(data.referralCode),
          JSON.stringify(data.earlyAccess || [])
        ]
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Successfully added to waitlist!' 
    });

  } catch (error: any) {
    console.error('Waitlist submission error:', error);

    if (error.code === 'ER_NO_SUCH_TABLE') {
      return NextResponse.json(
        { error: 'Something went wrong, Please try again later' },
        { status: 503 }
      );
    }

    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'This email is already registered on the waitlist' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong, Please try again later' },
      { status: 500 }
    );
  }
}
