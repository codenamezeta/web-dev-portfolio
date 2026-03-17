'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const themeOptions = [
  { value: 'system' as const, label: 'System', icon: Monitor },
  { value: 'light' as const, label: 'Light', icon: Sun },
  { value: 'dark' as const, label: 'Dark', icon: Moon },
] as const

export function SiteFooter() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const currentTheme = theme ?? 'system'
  const ThemeIcon = mounted
    ? (themeOptions.find((o) => o.value === currentTheme)?.icon ?? Monitor)
    : Monitor

  return (
    <footer
      className='border-t border-border bg-background print:hidden'
      role='contentinfo'
      aria-label='Site footer'
    >
      <div className='mx-auto flex container min-h-16 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md'
          aria-label='Home'
        >
          <Image
            src='/imgs/logos/mz-logo-black.png'
            alt=''
            width={36}
            height={36}
            className='h-9 w-auto dark:invert'
          />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='size-9 shrink-0'
              aria-label='Toggle theme'
            >
              <ThemeIcon className='size-4' aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuRadioGroup
              value={mounted ? currentTheme : 'system'}
              onValueChange={(value) =>
                setTheme(value as 'system' | 'light' | 'dark')
              }
            >
              {themeOptions.map(({ value, label, icon: OptionIcon }) => (
                <DropdownMenuRadioItem key={value} value={value}>
                  <OptionIcon className='size-4' aria-hidden />
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </footer>
  )
}
