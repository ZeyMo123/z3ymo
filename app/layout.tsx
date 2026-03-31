import type { Metadata, Viewport } from 'next'
import { syne, dmSans } from '@/app/fonts'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { OfflineBanner, InstallAppButton } from '@/lib/pwa'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Z3ymo — Built different. By design.',
    template: '%s | Z3ymo',
  },
  description:
    "Africa's premium AI-native software company. We build world-class websites, mobile apps, AI agents, and digital products — from Tanzania to the world.",
  keywords: [
    'software company Tanzania',
    'AI agents Africa',
    'web development Tanzania',
    'mobile app development',
    'custom software',
    'Z3ymo',
    'tech company Dar es Salaam',
    'AI SaaS Africa',
  ],
  authors: [{ name: 'Z3ymo', url: 'https://z3ymo.com' }],
  creator: 'Z3ymo',
  metadataBase: new URL('https://z3ymo.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://z3ymo.com',
    title: 'Z3ymo — Built different. By design.',
    description:
      "Africa's premium AI-native software company. World-class software, AI agents, and digital products — from Tanzania to the world.",
    siteName: 'Z3ymo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Z3ymo — Built different. By design.',
    description:
      "Africa's premium AI-native software company — Tanzania to the world.",
    creator: '@z3ymo',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F0EEF8' },
    { media: '(prefers-color-scheme: dark)',  color: '#0A0A0F' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <OfflineBanner />
          {children}
          <InstallAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
