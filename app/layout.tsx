import type { Metadata, Viewport } from 'next'
import { syne, dmSans } from '@/app/fonts'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import FloatingNav from '@/components/layout/FloatingNav'
import './globals.css'

// ─── Metadata ─────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default:  'Z3ymo — AI-powered software for modern businesses',
    template: '%s — Z3ymo',
  },
  description:
    'Z3ymo builds AI-powered software, platforms, and agents for modern businesses across Africa and beyond.',
  metadataBase: new URL('https://z3ymo.com'),
  openGraph: {
    type:      'website',
    locale:    'en_US',
    url:       'https://z3ymo.com',
    siteName:  'Z3ymo',
  },
  manifest: '/manifest.json',
  icons: {
    icon:  '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
}

export const viewport: Viewport = {
  themeColor:    '#0A0A0F',
  width:         'device-width',
  initialScale:  1,
}

// ─── Layout ───────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning is required here for two reasons:
    // 1. next-themes adds class/data-theme to <html> before React
    //    hydrates, causing a mismatch warning without this.
    // 2. next-themes injects a small <script> for FOUC prevention
    //    which React 19 warns about. suppressHydrationWarning on
    //    the closest ancestor (<html>) silences it correctly.
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${syne.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
