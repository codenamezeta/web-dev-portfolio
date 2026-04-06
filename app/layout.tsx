import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ThemeProvider } from '@/components/theme-provider'

import { Analytics } from '@vercel/analytics/next'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Michael Zeta • Full-Stack Web Developer',
  description:
    'Merging real-world business intuition with deep technical expertise in the React ecosystem. I build scalable, full-stack applications using Next.js and TypeScript, bringing a unique background in communication and project management to collaborative engineering teams.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      {
        url: '/imgs/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/imgs/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [{ url: '/imgs/favicons/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/imgs/favicons/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const themeScript = `
(function() {
  var storageKey = 'theme';
  var defaultTheme = 'system';
  try {
    var stored = localStorage.getItem(storageKey) || defaultTheme;
    var theme = stored;
    if (stored === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme) root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`

  return (
    <html
      lang='en'
      className={cn('font-sans', outfit.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
      </head>
      <body>
        <Analytics />
        <ThemeProvider>
          <SiteNav />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
