import { getAllPortfolioItems } from '@/lib/portfolio/data'
import { PortfolioList } from '@/components/portfolio-list'
import { PortfolioPageHeader } from '@/components/portfolio-page-header'

export default async function PortfolioPage() {
  const items = await getAllPortfolioItems()

  const listItems = items.map((item) => ({
    slug: item.slug,
    title: item.title,
    category: item.category,
    publishedAt: item.publishedAt.toISOString(),
    description: item.description,
    image: item.image,
    keywords: item.keywords,
    featuredOrder: item.featuredOrder,
  }))

  return (
    <main className='min-h-screen bg-background container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <PortfolioPageHeader />
      <PortfolioList items={listItems} />
    </main>
  )
}
