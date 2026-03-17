'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { PortfolioCategory } from '@/lib/portfolio/types'
import {
  RiFilter3Line,
  RiSortAsc,
  RiSortDesc,
  RiStarLine,
  RiSortAlphabetAsc,
} from '@remixicon/react'

export type PortfolioSortOption = 'newest' | 'oldest' | 'featured' | 'title-az'

export interface PortfolioListItem {
  slug: string
  title: string
  category: PortfolioCategory
  publishedAt: string // ISO date string for serialization
  description: string
  image?: string
  keywords: string[]
  /** Optional; lower value = higher in "Featured" sort. */
  featuredOrder?: number
}

interface PortfolioListProps {
  items: PortfolioListItem[]
}

const CATEGORY_OPTIONS: { value: 'all' | PortfolioCategory; label: string }[] =
  [
    { value: 'all', label: 'All categories' },
    { value: 'Client', label: 'Client' },
    { value: 'Personal', label: 'Personal' },
    { value: 'Learning', label: 'Learning' },
  ]

const SORT_OPTIONS: { value: PortfolioSortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title-az', label: 'Title A–Z' },
]

function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoDate))
}

function getCategoryVariant(
  category: PortfolioCategory,
): 'default' | 'secondary' | 'outline' {
  switch (category) {
    case 'Client':
      return 'default'
    case 'Personal':
      return 'secondary'
    case 'Learning':
      return 'outline'
    default:
      return 'secondary'
  }
}

export function PortfolioList({ items }: PortfolioListProps) {
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | PortfolioCategory
  >('all')
  const [sortOrder, setSortOrder] = useState<PortfolioSortOption>('featured')
  const reduceMotion = useReducedMotion()

  const filteredAndSorted = useMemo(() => {
    let list = items
    if (categoryFilter !== 'all') {
      list = list.filter((item) => item.category === categoryFilter)
    }
    list = [...list].sort((a, b) => {
      switch (sortOrder) {
        case 'featured': {
          const orderA = a.featuredOrder ?? Number.POSITIVE_INFINITY
          const orderB = b.featuredOrder ?? Number.POSITIVE_INFINITY
          return orderA - orderB
        }
        case 'newest': {
          const tA = new Date(a.publishedAt).getTime()
          const tB = new Date(b.publishedAt).getTime()
          return tB - tA
        }
        case 'oldest': {
          const tA = new Date(a.publishedAt).getTime()
          const tB = new Date(b.publishedAt).getTime()
          return tA - tB
        }
        case 'title-az':
          return a.title.localeCompare(b.title, undefined, {
            sensitivity: 'base',
          })
        default:
          return 0
      }
    })
    return list
  }, [items, categoryFilter, sortOrder])

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: 'easeOut' as const }
  const staggerDelay = reduceMotion ? 0 : 0.08

  return (
    <div className='space-y-8'>
      <div
        className='flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between'
        role='search'
        aria-label='Filter and sort portfolio'
      >
        <div className='flex flex-wrap items-center gap-3'>
          <div className='flex items-center gap-2'>
            <RiFilter3Line
              className='size-4 text-muted-foreground'
              aria-hidden
            />
            <Select
              value={categoryFilter}
              onValueChange={(v) =>
                setCategoryFilter(v as 'all' | PortfolioCategory)
              }
            >
              <SelectTrigger
                className='w-[180px]'
                aria-label='Filter by category'
              >
                <SelectValue placeholder='Category' />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            {sortOrder === 'newest' && (
              <RiSortDesc
                className='size-4 text-muted-foreground'
                aria-hidden
              />
            )}
            {sortOrder === 'oldest' && (
              <RiSortAsc className='size-4 text-muted-foreground' aria-hidden />
            )}
            {sortOrder === 'featured' && (
              <RiStarLine
                className='size-4 text-muted-foreground'
                aria-hidden
              />
            )}
            {sortOrder === 'title-az' && (
              <RiSortAlphabetAsc
                className='size-4 text-muted-foreground'
                aria-hidden
              />
            )}
            <Select
              value={sortOrder}
              onValueChange={(v) => setSortOrder(v as PortfolioSortOption)}
            >
              <SelectTrigger className='w-[160px]' aria-label='Sort order'>
                <SelectValue placeholder='Sort' />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className='text-sm text-muted-foreground'>
          {filteredAndSorted.length} project
          {filteredAndSorted.length !== 1 ? 's' : ''}
        </p>
      </div>

      <ul className='grid grid-cols-1 gap-6 md:grid-cols-2' role='list'>
        {filteredAndSorted.map((item, index) => (
          <motion.li
            key={item.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: index * staggerDelay }}
          >
            <Link
              href={`/portfolio/${item.slug}`}
              className='block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl'
              aria-label={`View case study: ${item.title}`}
            >
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        transition: { duration: 0.2 },
                      }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  size='sm'
                  className={cn(
                    'overflow-hidden border border-border bg-card text-left transition-colors duration-200',
                    'hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5',
                    'focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/20',
                  )}
                >
                  <div className='relative aspect-[4/3] w-full overflow-hidden bg-muted'>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=''
                        fill
                        sizes='(max-width: 768px) 100vw, 50vw'
                        className='object-cover transition-transform duration-300 group-hover/card:scale-105'
                        unoptimized={item.image.startsWith('data:')}
                      />
                    ) : (
                      <div
                        className='absolute inset-0 flex items-center justify-center text-muted-foreground/50'
                        aria-hidden
                      >
                        <span className='text-sm font-medium'>No image</span>
                      </div>
                    )}
                    <div
                      className='absolute inset-0 bg-linear-to-t from-card/90 via-card/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100'
                      aria-hidden
                    />
                  </div>
                  <CardHeader className='flex flex-row flex-wrap items-center gap-2 pb-1'>
                    <Badge variant={getCategoryVariant(item.category)}>
                      {item.category}
                    </Badge>
                    <time
                      dateTime={item.publishedAt}
                      className='text-xs text-muted-foreground'
                    >
                      {formatDate(item.publishedAt)}
                    </time>
                  </CardHeader>
                  <CardTitle className='px-4 text-base font-semibold text-foreground leading-tight sm:text-lg'>
                    {item.title}
                  </CardTitle>
                  <CardDescription className='mt-1 line-clamp-2 px-4 text-sm'>
                    {item.description}
                  </CardDescription>
                  {item.keywords.length > 0 && (
                    <CardContent className='flex flex-wrap gap-1.5 px-4 pt-2'>
                      {item.keywords.slice(0, 4).map((keyword) => (
                        <Badge
                          key={keyword}
                          variant='outline'
                          className='text-xs font-normal'
                        >
                          {keyword}
                        </Badge>
                      ))}
                      {item.keywords.length > 4 && (
                        <Badge
                          variant='outline'
                          className='text-xs font-normal text-muted-foreground'
                        >
                          +{item.keywords.length - 4}
                        </Badge>
                      )}
                    </CardContent>
                  )}
                  <CardFooter className='border-t border-border/80 bg-muted/30'>
                    <span className='inline-flex items-center text-sm font-medium text-primary'>
                      Read case study
                      <span
                        className='ml-1 inline-block transition-transform duration-200 group-hover/card:translate-x-0.5'
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </CardFooter>
                </Card>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </ul>

      {filteredAndSorted.length === 0 && (
        <p className='py-12 text-center text-muted-foreground'>
          No projects match the selected filters.
        </p>
      )}
    </div>
  )
}
