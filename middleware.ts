import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  }

  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    if (origin && host) {
      const originUrl = new URL(origin);
      if (originUrl.host !== host) {
        console.warn('CSRF Warning: Origin mismatch', { origin, host });
      }
    }
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
