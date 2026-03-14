import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'
import ConditionalNavbar from '@/components/conditional-navbar'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
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
        <Script
          id="gcm-default"
          strategy="afterInteractive"
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
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="3e2781af-7578-43ff-9509-50338ebf42b1"
          data-blockingmode="auto"
          strategy="afterInteractive"
        />
        <GoogleAnalytics gaId="G-3WS60EMJC2" />
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
