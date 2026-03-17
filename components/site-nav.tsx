'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
] as const

function isActive(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/'
  if (href.startsWith('/'))
    return pathname === href || pathname.startsWith(href + '/')
  return false
}

export function SiteNav() {
  const pathname = usePathname()

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 print:hidden'>
      <div className='mx-auto flex h-14 container items-center justify-between px-4 sm:px-6 lg:px-8'>
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
        <NavigationMenu
          viewport={false}
          className='max-w-none justify-end'
          aria-label='Main navigation'
        >
          <NavigationMenuList className='gap-1'>
            {navLinks.map(({ href, label }) => {
              const active = isActive(href, pathname)
              return (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'underline-offset-4 hover:underline decoration-1 hover:scale-105 transition-all duration-300',
                        active && 'underline',
                      )}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
