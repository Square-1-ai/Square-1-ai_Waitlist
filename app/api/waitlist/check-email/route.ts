import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Lightweight endpoint to check if email exists in waitlist
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
    
    // Check if email exists
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
      { error: 'Failed to check email' },
      { status: 500 }
    );
  }
}
