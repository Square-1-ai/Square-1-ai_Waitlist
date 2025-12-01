import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeEmail(email: string | undefined | null): string {
  if (!email) return '';
  return String(email).trim().toLowerCase().slice(0, 254);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = sanitizeEmail(body.email);
    const name = body.name;
    const role = body.role;
    const newsletter = body.newsletter || false;
    const studentTagId = 13026251
    const teacherTagId = 13026254
    const newsLetterEnabledTagId = 13026258
    

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!CONVERTKIT_API_KEY ) {
      console.error('Missing ConvertKit configuration');
      return NextResponse.json(
        { error: 'Newsletter service is not configured' },
        { status: 500 }
      );
    }

    const tags: number[] = [];
    
    if (role === 'student') {
      tags.push(studentTagId);
    } else if (role === 'teacher') {
      tags.push(teacherTagId);
    }
    
    if (newsletter) {
      tags.push(newsLetterEnabledTagId);
    }

    console.log('Subscribing with tags:', tags);
        console.log('Subscribing with nmae:', name);


    const convertkitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
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
