import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import type { PortfolioCategory, PortfolioItem } from './types'

const CONTENT_DIR = join(process.cwd(), 'content', 'portfolio')

function parseCategory(value: unknown): PortfolioCategory {
  if (value === 'Client' || value === 'Personal' || value === 'Learning') {
    return value
  }
  return 'Personal'
}

function parseDate(value: unknown): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value
  }
  if (typeof value === 'string') {
    const d = new Date(value)
    if (!Number.isNaN(d.getTime())) return d
  }
  return new Date()
}

/**
 * Load one portfolio item from a Markdown file. Slug is the filename without .md.
 */
export async function loadPortfolioItemBySlug(
  slug: string,
): Promise<PortfolioItem | undefined> {
  const path = join(CONTENT_DIR, `${slug}.md`)
  let raw: string
  try {
    raw = await readFile(path, 'utf-8')
  } catch {
    return undefined
  }
  const { data, content } = matter(raw)
  const frontmatter = data as Record<string, unknown>
  const image: string | undefined =
    frontmatter.image != null ? String(frontmatter.image)
    : frontmatter.thumbnail != null ? String(frontmatter.thumbnail)
    : undefined

  const rawKeywords = frontmatter.keywords
  const keywords: string[] =
    Array.isArray(rawKeywords) ?
      rawKeywords.map((k) => String(k).trim()).filter(Boolean)
    : typeof rawKeywords === 'string' ?
      rawKeywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean)
    : []

  const rawFeatured = frontmatter.featuredOrder
  const featuredOrder: number | undefined =
    typeof rawFeatured === 'number' && Number.isFinite(rawFeatured) ?
      rawFeatured
    : typeof rawFeatured === 'string' ?
      (() => {
        const n = Number.parseInt(rawFeatured, 10)
        return Number.isNaN(n) ? undefined : n
      })()
    : undefined

  return {
    slug,
    title: String(frontmatter.title ?? 'Untitled'),
    category: parseCategory(frontmatter.category),
    publishedAt: parseDate(frontmatter.publishedAt),
    liveUrl: frontmatter.liveUrl ? String(frontmatter.liveUrl) : undefined,
    sourceUrl:
      frontmatter.sourceUrl ? String(frontmatter.sourceUrl) : undefined,
    image,
    keywords,
    featuredOrder,
    description: String(frontmatter.description ?? ''),
    content: content.trim(),
  }
}

/**
 * Load all portfolio items from content/portfolio/*.md.
 */
export async function loadAllPortfolioItemsFromFiles(): Promise<
  PortfolioItem[]
> {
  let files: string[]
  try {
    files = await readdir(CONTENT_DIR)
  } catch {
    return []
  }
  const mdFiles = files.filter(
    (f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md',
  )
  const items = await Promise.all(
    mdFiles.map((f) => loadPortfolioItemBySlug(f.replace(/\.md$/, ''))),
  )
  return items
    .filter((item): item is PortfolioItem => item != null)
    .sort((a, b) => {
      // Projects with lower featuredOrder (01, 02, ...) come first.
      // If both are undefined, or both equal, fallback to publishedAt desc.
      const aOrder = a.featuredOrder ?? Number.POSITIVE_INFINITY
      const bOrder = b.featuredOrder ?? Number.POSITIVE_INFINITY
      if (aOrder !== bOrder) {
        return aOrder - bOrder
      }
      return b.publishedAt.getTime() - a.publishedAt.getTime()
    })
}

/**
 * Get all slugs from filenames in content/portfolio/.
 */
export async function loadAllPortfolioSlugsFromFiles(): Promise<string[]> {
  let files: string[]
  try {
    files = await readdir(CONTENT_DIR)
  } catch {
    return []
  }
  return files
    .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
    .map((f) => f.replace(/\.md$/, ''))
}
