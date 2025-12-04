import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ConditionalNavbar from '@/components/conditional-navbar'
import { Toaster } from '@/components/ui/toaster'

const interTight = Inter_Tight({ 
  subsets: ["latin"],
  variable: '--font-inter-tight',
});

export const metadata: Metadata = {
  title: 'Sqaure1',
  description: 'Sqaure1 AI',
  generator: 'v0.app',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet" />
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
