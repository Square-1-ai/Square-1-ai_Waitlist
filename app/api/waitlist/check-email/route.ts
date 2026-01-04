import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { emailCheckLimiter, getClientIdentifier, formatTimeRemaining } from '@/lib/rate-limiter';

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
    const rateLimit = emailCheckLimiter.check(clientId);

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
    const { email, type } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }


    try {
      const [studentResults, teacherResults] = await Promise.all([
        query(`SELECT email FROM students WHERE email = ? LIMIT 1`, [email.toLowerCase().trim()]),
        query(`SELECT email FROM teachers WHERE email = ? LIMIT 1`, [email.toLowerCase().trim()])
      ]);

      const existsInStudents = Array.isArray(studentResults) && studentResults.length > 0;
      const existsInTeachers = Array.isArray(teacherResults) && teacherResults.length > 0;
      const exists = existsInStudents || existsInTeachers;

      return NextResponse.json({ 
        exists,
        email 
      });
    } catch (dbError: any) {
      if (dbError.code === 'ER_NO_SUCH_TABLE') {
        console.error('Database tables not initialized. Run: npm run db:init');
        return NextResponse.json(
          { error: 'Something went wrong, Please try again later' },
          { status: 503 }
        );
      }
      throw dbError; // Re-throw other errors to be caught by outer catch
    }

  } catch (error: any) {
    console.error('Email check error:', error);
    return NextResponse.json(
      { error: 'Something went wrong, Please try again later' },
      { status: 500 }
    );
  }
}
