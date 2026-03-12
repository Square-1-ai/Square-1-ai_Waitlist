import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ConditionalNavbar from '@/components/conditional-navbar'
import { Toaster } from '@/components/ui/toaster'
import { GoogleAnalytics } from '@next/third-parties/google'


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
        <GoogleAnalytics gaId="G-3WS60EMJC2" />
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
