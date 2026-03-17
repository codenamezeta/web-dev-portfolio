import Link from 'next/link'
import { getAllPortfolioItems } from '@/lib/portfolio/data'
import { Button } from '@/components/ui/button'
import { PortfolioOverviewCards } from '@/components/portfolio-overview-cards'

const TOP_PROJECTS_COUNT = 3

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%236b7280' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='system-ui' font-size='18' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EProject%3C/text%3E%3C/svg%3E"

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export async function PortfolioOverview() {
  const allItems = await getAllPortfolioItems()
  const topItems = allItems.slice(0, TOP_PROJECTS_COUNT)

  if (topItems.length === 0) {
    return null
  }

  const items = topItems.map((item) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    category: item.category,
    dateFormatted: formatDate(item.publishedAt),
    image: item.image ?? PLACEHOLDER_IMAGE,
  }))

  return (
    <section
      className='border-t border-border py-16 md:py-24 bg-muted/50'
      aria-labelledby='portfolio-overview-heading'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='mb-10 text-center md:mb-14'>
          <h2
            id='portfolio-overview-heading'
            className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl'
          >
            Featured Projects
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg'>
            Recent work spanning full-stack development, client projects, and
            experiments.
          </p>
        </header>

        <PortfolioOverviewCards items={items} />

        <div className='mt-12 flex justify-center'>
          <Button asChild size='lg' variant='outline' className='min-h-11'>
            <Link href='/portfolio'>View all projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
