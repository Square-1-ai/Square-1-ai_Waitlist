import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const table = type === 'teacher' ? 'teachers' : 'students';

    const results: any = await query(
      `SELECT email FROM ${table} WHERE email = ? LIMIT 1`,
      [email.toLowerCase().trim()]
    );

    const exists = Array.isArray(results) && results.length > 0;

    return NextResponse.json({ 
      exists,
      email 
    });

  } catch (error: any) {
    console.error('Email check error:', error);
    return NextResponse.json(
      { error: 'Something went wrong, Please try again later' },
      { status: 500 }
    );
  }
}
