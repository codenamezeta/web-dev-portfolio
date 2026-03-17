'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { PortfolioCategory } from '@/lib/portfolio/types'

export interface PortfolioOverviewCardItem {
  slug: string
  title: string
  description: string
  category: PortfolioCategory
  dateFormatted: string
  image: string
}

interface PortfolioOverviewCardsProps {
  items: PortfolioOverviewCardItem[]
}

function getCategoryVariant(
  category: PortfolioCategory,
): 'default' | 'secondary' | 'accent' | 'outline' {
  switch (category) {
    case 'Client':
      return 'default'
    case 'Personal':
      return 'accent'
    case 'Learning':
      return 'outline'
    default:
      return 'secondary'
  }
}

export function PortfolioOverviewCards({ items }: PortfolioOverviewCardsProps) {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: 'easeOut' as const }
  const staggerDelay = reduceMotion ? 0 : 0.12

  return (
    <ul
      className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
      role='list'
    >
      {items.map((item, index) => (
        <motion.li
          key={item.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: index * staggerDelay }}
        >
          <Link
            href={`/portfolio/${item.slug}`}
            className={cn(
              'group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card',
              'transition-colors hover:border-primary/40 hover:bg-card/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
            aria-label={`View project: ${item.title}`}
          >
            <motion.div
              className='relative aspect-video w-full overflow-hidden bg-muted'
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={item.image.startsWith('data:') ? item.image : item.image}
                alt=''
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='object-cover transition-[transform,filter] duration-300 group-hover:scale-105 saturate-80 group-hover:saturate-100'
                unoptimized={item.image.startsWith('data:')}
              />
              <div
                className='absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                aria-hidden
              />
            </motion.div>
            <div className='flex flex-1 flex-col p-5'>
              <div className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
                <Badge variant={getCategoryVariant(item.category)}>
                  {item.category}
                </Badge>
                <time dateTime={item.dateFormatted}>{item.dateFormatted}</time>
              </div>
              <h3 className='mt-2 text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors'>
                {item.title}
              </h3>
              <p className='mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground'>
                {item.description}
              </p>
              <span className='mt-3 inline-flex items-center text-sm font-medium text-primary'>
                View case study
                <span
                  className='ml-1 transition-transform group-hover:translate-x-0.5'
                  aria-hidden
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}
