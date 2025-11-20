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

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

    if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
      console.error('Missing Beehiiv configuration');
      return NextResponse.json(
        { error: 'Newsletter service is not configured' },
        { status: 500 }
      );
    }

    const beehiivResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: 'website',
        utm_medium: 'footer',
        utm_campaign: 'newsletter_signup',
      }),
    });

    const beehiivData = await beehiivResponse.json();

    if (!beehiivResponse.ok) {
      console.error('Beehiiv API error:', beehiivData);

      if (beehiivResponse.status === 400 && beehiivData.errors) {
        const errorMessage = beehiivData.errors[0]?.message || 'Invalid email or already subscribed';
        return NextResponse.json(
          { error: errorMessage },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: beehiivResponse.status }
      );
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter!',
        success: true,
        data: beehiivData
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
