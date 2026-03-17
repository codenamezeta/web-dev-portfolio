'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

const MEDIA_QUERY = '(prefers-color-scheme: dark)'

function getResolvedSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light'
}

function applyThemeToDocument(theme: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

/**
 * Syncs system preference to the document when theme is "system".
 * Uses addEventListener('change') and visibilitychange so that when the user
 * returns to the tab (e.g. after changing OS theme), we re-apply. This works
 * around browsers (e.g. Firefox/Zen) that don't always fire the media query
 * change event when the OS theme changes.
 */
export function ThemeSystemSync() {
  const { theme } = useTheme()

  useEffect(() => {
    if (theme !== 'system') return

    const media = window.matchMedia(MEDIA_QUERY)

    const applySystem = () => {
      const resolved = getResolvedSystemTheme()
      applyThemeToDocument(resolved)
    }

    applySystem()

    media.addEventListener('change', applySystem)

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') applySystem()
    }
    const onWindowFocus = () => applySystem()

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('focus', onWindowFocus)

    return () => {
      media.removeEventListener('change', applySystem)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('focus', onWindowFocus)
    }
  }, [theme])

  return null
}
