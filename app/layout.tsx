import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'
import ConditionalNavbar from '@/components/conditional-navbar'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'


const interTight = Inter_Tight({ 
  subsets: ["latin"],
  variable: '--font-inter-tight',
});

export const metadata: Metadata = {
  title: 'Square1',
  description: 'Square1 AI',
  icons: {
    icon: [
      {
        url: '/metadata.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/metadata.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/metadata.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/metadata.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Consent Mode - Load FIRST to set defaults */}
        <Script
          id="gcm-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag("consent", "default", {
                  ad_personalization: "denied",
                  ad_storage: "denied",
                  ad_user_data: "denied",
                  analytics_storage: "denied",
                  functionality_storage: "denied",
                  personalization_storage: "denied",
                  security_storage: "granted",
                  wait_for_update: 500,
              });
              gtag("set", "ads_data_redaction", true);
            `,
          }}
        />

        {/* Cookiebot - Load BEFORE other scripts to block tracking */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="3e2781af-7578-43ff-9509-50338ebf42b1"
          data-blockingmode="auto"
          data-gcm-enabled="true"
          strategy="beforeInteractive"
        />

        {/* Cookiebot Consent Callbacks - Update GCM and load GA only after consent */}
        <Script
          id="cookiebot-consent-bridge"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var gaLoaded = false;

              function loadGoogleAnalytics() {
                if (gaLoaded) return;
                gaLoaded = true;

                gtag('consent', 'update', {
                  'analytics_storage': 'granted'
                });

                var gaScript = document.createElement('script');
                gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-3WS60EMJC2';
                gaScript.async = true;
                document.head.appendChild(gaScript);

                gaScript.onload = function() {
                  window.gtag('js', new Date());
                  window.gtag('config', 'G-3WS60EMJC2'${process.env.NODE_ENV === 'development' ? ", { debug_mode: true }" : ""});
                  window.dispatchEvent(new Event('ga:ready'));
                };
              }

              // Fires on every page load once consent data is ready (new decision OR stored from previous visit)
              window.addEventListener('CookiebotOnConsentReady', function() {
                if (Cookiebot.consent.statistics) {
                  loadGoogleAnalytics();
                }
              });

              window.addEventListener('CookiebotOnDecline', function() {
                gtag('consent', 'update', {
                  'analytics_storage': 'denied'
                });
              });
            `,
          }}
        />

        {/* reCAPTCHA v3 - Security-essential (GDPR Article 6(1)(f) allows for legitimate security interests) */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </head>
      <body className={`${interTight.variable} font-sans antialiased`} suppressHydrationWarning>
        <ConditionalNavbar />

        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
