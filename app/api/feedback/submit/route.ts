import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeString(input: string | undefined | null): string {
  if (!input) return '';
  return String(input).trim().slice(0, 2000);
}

function validateFeedback(data: any): { valid: boolean; error?: string } {
  if (!data.name || sanitizeString(data.name).length < 2) {
    return { valid: false, error: 'Name is required (minimum 2 characters)' };
  }
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return { valid: false, error: 'Valid email is required' };
  }
  if (!data.country || sanitizeString(data.country).length < 2) {
    return { valid: false, error: 'Country is required' };
  }
  if (!data.message || sanitizeString(data.message).length < 10) {
    return { valid: false, error: 'Feedback message is required (minimum 10 characters)' };
  }
  return { valid: true };
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = validateFeedback(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: sanitizeString(body.name),
      email: sanitizeString(body.email).toLowerCase(),
      country: sanitizeString(body.country),
      message: sanitizeString(body.message),
      aiToolsExpectation: sanitizeString(body.aiToolsExpectation),
      learningProgressTracking: sanitizeString(body.learningProgressTracking),
      courseTypes: sanitizeString(body.courseTypes),
      favoriteCourses: sanitizeString(body.favoriteCourses),
    };

    await query(
      `INSERT INTO feedback (
        name, email, country, message, ai_tools_expectation, 
        learning_progress_tracking, course_types, favorite_courses
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.country,
        sanitizedData.message,
        sanitizedData.aiToolsExpectation || null,
        sanitizedData.learningProgressTracking || null,
        sanitizedData.courseTypes || null,
        sanitizedData.favoriteCourses || null,
      ]
    );

    return NextResponse.json(
      { 
        message: 'Feedback submitted successfully',
        success: true 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Feedback submission error:', error);

    if (error.code === 'ER_NO_SUCH_TABLE') {
      return NextResponse.json(
        { error: 'Something went wrong, Please try again later' },
        { status: 503 }
      );
    }

    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'This email has already submitted feedback. ' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Something went wrong, please try again later',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
