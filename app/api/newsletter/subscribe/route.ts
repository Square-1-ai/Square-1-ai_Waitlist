import { NextRequest, NextResponse } from 'next/server';
import { newsletterLimiter, getClientIdentifier, formatTimeRemaining } from '@/lib/rate-limiter';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeEmail(email: string | undefined | null): string {
  if (!email) return '';
  return String(email).trim().toLowerCase().slice(0, 254);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100kb',
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientIdentifier(req);
    const rateLimit = newsletterLimiter.check(clientId);

    if (!rateLimit.allowed) {
      const timeRemaining = formatTimeRemaining(rateLimit.resetTime);
      return NextResponse.json(
        { error: `Too many requests. Please try again in ${timeRemaining}.` },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
          }
        }
      );
    }

    const body = await req.json();
    const email = sanitizeEmail(body.email);
    const name = body.name;
    const role = body.role;
    const newsletter = body.newsletter || false;

    

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.SUBSCRIBER_FORM_ID;
    const nonSubFormId = process.env.NONSUBSCRIBER_FORM_ID;
    const studentTagId = process.env.STUDENT_TAG_ID;
    const teacherTagId = process.env.TEACHER_TAG_ID;
    const newsLetterEnabledTagId = process.env.NEWSLETTER_ENABLED_TAG_ID;

    if (!CONVERTKIT_API_KEY || !formId || !nonSubFormId || !studentTagId || !teacherTagId || !newsLetterEnabledTagId) {
      console.error('Missing ConvertKit configuration:', {
        hasApiKey: !!CONVERTKIT_API_KEY,
        hasFormId: !!formId,
        hasNonSubFormId: !!nonSubFormId,
        hasStudentTagId: !!studentTagId,
        hasTeacherTagId: !!teacherTagId,
        hasNewsletterTagId: !!newsLetterEnabledTagId
      });
      return NextResponse.json(
        { error: 'Newsletter service is not configured' },
        { status: 500 }
      );
    }

    const tags: number[] = [];
    
    if (role === 'student') {
      tags.push(Number(studentTagId));
    } else if (role === 'teacher') {
      tags.push(Number(teacherTagId));
    }
    
    if (newsletter) {
      tags.push(Number(newsLetterEnabledTagId));
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Subscribing with tags:', tags);
      console.log('Subscribing with name:', name);
      console.log('Newsletter preference:', newsletter);
      console.log('Using form ID:', newsletter ? formId : nonSubFormId);
    }

    // Use different form ID based on newsletter preference
    const selectedFormId = newsletter ? formId : nonSubFormId;

    const convertkitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${selectedFormId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        api_key: CONVERTKIT_API_KEY,
        first_name: name,
        tags: tags,
      }),
    });

    const convertkitData = await convertkitResponse.json();

    if (!convertkitResponse.ok) {
      console.error('ConvertKit API error:', convertkitData);

      if (convertkitResponse.status === 400 && convertkitData.errors) {
        const errorMessage = convertkitData.errors[0]?.message || 'Invalid email or already subscribed';
        return NextResponse.json(
          { error: errorMessage },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: convertkitResponse.status }
      );
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter!',
        success: true,
        data: convertkitData
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { 
        error: 'Something Went Wrong, Please try again later',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
