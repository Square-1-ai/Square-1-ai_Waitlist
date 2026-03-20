import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { waitlistLimiter, getClientIdentifier, formatTimeRemaining } from '@/lib/rate-limiter';
import { verifyRecaptcha } from '@/lib/recaptcha';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

interface WaitlistData {
  fullName: string;
  email: string;
  dob: string;
  parentName?: string;
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
  // GDPR Consent fields
  dataProcessingConsent: boolean;
  newsletterConsent: boolean;
}

interface SubmitRequest {
  type: 'student' | 'teacher';
  data: WaitlistData;
  recaptchaToken?: string;
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

function validateWaitlistData(data: WaitlistData, type: string): { valid: boolean; error?: string } {
  // GDPR Compliance: Data processing consent must be given
  if (!data.dataProcessingConsent) {
    return { valid: false, error: 'You must consent to data processing to continue' };
  }

  if (!data.fullName || sanitizeString(data.fullName).length < 2) {
    return { valid: false, error: 'Full name is required (minimum 2 characters)' };
  }
  if (type === 'student' && !data.dob) {
    return { valid: false, error: 'Date of birth is required' };
  }
  if (type === 'student' && data.dob) {
    const dob = new Date(data.dob);
    const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18 && !sanitizeString(data.parentName)) {
      return { valid: false, error: 'Parent or guardian name is required for students under 18' };
    }
  }
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return { valid: false, error: 'Valid email is required' };
  }
  return { valid: true };
}

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
    const { type, data, recaptchaToken } = body;

    // Verify reCAPTCHA v3 token
    const recaptchaResult = await verifyRecaptcha(recaptchaToken || '', 'waitlist_submit');
    if (!recaptchaResult.success) {
      console.warn('reCAPTCHA verification failed:', recaptchaResult.error);
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 403 }
      );
    }

    if (type !== 'student' && type !== 'teacher') {
      return NextResponse.json(
        { error: 'Invalid submission type' },
        { status: 400 }
      );
    }

    const validation = validateWaitlistData(data, type);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeString(data.email).toLowerCase();

    // Get IP address for consent audit trail
    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                      req.headers.get('x-real-ip') ||
                      'unknown';

    // Tables are created once using: npm run db:init

    if (type === 'student') {
      await query(
        `INSERT INTO students (
          full_name, email, dob, parent_name, country, city, internet_connection, devices,
          heard_about, education_level, subjects, learning_preference,
          taken_online_courses, why_interested, motivation, competitions,
          hours_per_week, willing_to_pay, referral_code, early_access,
          data_processing_consent, newsletter_consent, consent_timestamp, consent_ip_address
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),?)`,
        [
          sanitizeString(data.fullName),
          sanitizedEmail,
          sanitizeString(data.dob),
          sanitizeString(data.parentName) || null,
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
          data.dataProcessingConsent,
          data.newsletterConsent || false,
          ipAddress
        ]
      );
    } else {
      await query(
        `INSERT INTO teachers (
          full_name, email, country, city, internet_connection, devices,
          heard_about, subjects, teaching_level, years_experience,
          class_type_preference, taught_online, platforms_used, curriculums,
          create_study_packs, availability_to_start, revenue_split,
          payment_method, referral_code, early_access,
          data_processing_consent, newsletter_consent, consent_timestamp, consent_ip_address
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),?)`,
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
          JSON.stringify(data.earlyAccess || []),
          data.dataProcessingConsent,
          data.newsletterConsent || false,
          ipAddress
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
