/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    const allowedOrigin =
      process.env.ALLOWED_ORIGIN ||
      (process.env.NODE_ENV === 'production' ? 'https://www.square1ai.com' : 'http://localhost:3000');

    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://consent.cookiebot.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.convertkit.com https://vitals.vercel-insights.com https://api.getwaitlist.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.google.com https://www.recaptcha.net",
      "frame-src https://www.google.com https://www.recaptcha.net https://consentcdn.cookiebot.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: allowedOrigin,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400',
          },
        ],
      },
    ];
  },
}

export default nextConfig
