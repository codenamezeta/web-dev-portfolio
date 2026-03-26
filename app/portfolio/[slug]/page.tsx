import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Code } from 'lucide-react'
import {
  getPortfolioItemBySlug,
  getAllPortfolioSlugs,
} from '@/lib/portfolio/data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CaseStudyContent } from '@/components/portfolio/case-study-content'
import { MarkdownCaseStudy } from '@/components/portfolio/markdown-case-study'
import { cn } from '@/lib/utils'
import { CTASection } from '@/components/sections/cta-section'

type PageProps = {
  params: Promise<{ slug: string }>
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

function getCategoryVariant(
  category: 'Client' | 'Personal' | 'Learning',
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

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getPortfolioItemBySlug(slug)
  if (!item) return { title: 'Portfolio | Not Found' }
  return {
    title: `${item.title} | Portfolio`,
    description: item.description,
    openGraph:
      item.image ?
        { images: [{ url: item.image, alt: item.title }] }
      : undefined,
  }
}

export default async function PortfolioItemPage({ params }: PageProps) {
  const { slug } = await params
  const item = await getPortfolioItemBySlug(slug)

  if (!item) notFound()

  return (
    <>
      <main className='min-h-screen bg-background pb-60'>
        <div className='mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8'>
          {/* Back link */}
          <nav aria-label='Breadcrumb' className='mb-8'>
            <Button
              variant='ghost'
              size='sm'
              asChild
              className='-ml-2 text-muted-foreground'
            >
              <Link href='/portfolio'>
                <ArrowLeft data-icon='inline-start' aria-hidden />
                <span>Back to Portfolio</span>
              </Link>
            </Button>
          </nav>

          {/* Header */}
          <header className='flex flex-col gap-4 border-b border-border pb-6'>
            <div className='flex flex-wrap items-center gap-2 text-muted-foreground'>
              <Badge variant={getCategoryVariant(item.category)}>
                {item.category}
              </Badge>
              <time dateTime={item.publishedAt.toISOString()}>
                {formatDate(item.publishedAt)}
              </time>
            </div>
            <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              {item.title}
            </h1>
            <div className='flex flex-wrap gap-2'>
              {item.keywords?.map((keyword) => (
                <Badge
                  key={keyword}
                  variant='outline'
                  className='text-xs font-normal text-muted-foreground'
                >
                  {keyword}
                </Badge>
              ))}
            </div>
            <div className='flex flex-wrap gap-3'>
              {item.liveUrl && (
                <Button
                  asChild
                  size='default'
                  className='min-h-11 min-w-[44px]'
                >
                  <a
                    href={item.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='View live project (opens in new tab)'
                  >
                    <ExternalLink data-icon='inline-start' aria-hidden />
                    View Live Project
                  </a>
                </Button>
              )}
              {item.sourceUrl && (
                <Button
                  asChild
                  variant='outline'
                  size='default'
                  className='min-h-11 min-w-[44px]'
                >
                  <a
                    href={item.sourceUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='View source code on GitHub (opens in new tab)'
                  >
                    <Code data-icon='inline-start' aria-hidden />
                    View Source Code
                  </a>
                </Button>
              )}
            </div>
          </header>

          {/* Case study body */}
          <section
            className={cn(
              'flex flex-col gap-6',
              'prose-case-study [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80',
            )}
            aria-label='Case study'
          >
            {item.content ?
              <MarkdownCaseStudy content={item.content} />
            : item.caseStudy?.length ?
              <CaseStudyContent blocks={item.caseStudy} />
            : null}
          </section>
        </div>
      </main>
      <CTASection
        ctaHeading='Could Your Business Benefit from a Custom Website?'
        ctaBody="I can help you build a website that is not only functional and beautiful, but also optimized for search engines and easy to maintain. Drop me a line, and let's chat about how I can help you improve your own digital presence."
      />
    </>
  )
}
