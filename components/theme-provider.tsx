'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeSystemSync } from '@/components/theme-system-sync'

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeSystemSync />
      {children}
    </NextThemesProvider>
  )
}
