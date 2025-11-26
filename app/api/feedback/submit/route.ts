import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

function sanitizeString(input: string | undefined | null): string {
  if (!input) return '';
  return String(input).trim().slice(0, 2000);
}

function validateFeedback(data: any): { valid: boolean; error?: string } {
  if (!data.name || sanitizeString(data.name).length < 2) {
    return { valid: false, error: 'Name is required (minimum 2 characters)' };
  }
  if (!data.country || sanitizeString(data.country).length < 2) {
    return { valid: false, error: 'Country is required' };
  }
  if (!data.message || sanitizeString(data.message).length < 10) {
    return { valid: false, error: 'Feedback message is required (minimum 10 characters)' };
  }
  return { valid: true };
}

export async function POST(req: NextRequest) {
  const feedbackTableSQL = `
    CREATE TABLE IF NOT EXISTS feedback (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      ai_tools_expectation TEXT,
      learning_progress_tracking TEXT,
      course_types TEXT,
      favorite_courses TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    const body = await req.json();

    const validation = validateFeedback(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    await query(feedbackTableSQL);

    const sanitizedData = {
      name: sanitizeString(body.name),
      country: sanitizeString(body.country),
      message: sanitizeString(body.message),
      aiToolsExpectation: sanitizeString(body.aiToolsExpectation),
      learningProgressTracking: sanitizeString(body.learningProgressTracking),
      courseTypes: sanitizeString(body.courseTypes),
      favoriteCourses: sanitizeString(body.favoriteCourses),
    };

    await query(
      `INSERT INTO feedback (
        name, country, message, ai_tools_expectation, 
        learning_progress_tracking, course_types, favorite_courses
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        sanitizedData.name,
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
    
    return NextResponse.json(
      { 
        error: 'Something went wrong, please try again later',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
