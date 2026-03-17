import {
  loadPortfolioItemBySlug as loadBySlug,
  loadAllPortfolioItemsFromFiles,
  loadAllPortfolioSlugsFromFiles,
} from "./load-from-files";

/**
 * Get a single portfolio item by slug (from content/portfolio/{slug}.md).
 * Returns undefined if not found.
 */
export async function getPortfolioItemBySlug(
  slug: string,
): Promise<Awaited<ReturnType<typeof loadBySlug>>> {
  return loadBySlug(slug);
}

/**
 * Get all portfolio item slugs for static generation.
 */
export async function getAllPortfolioSlugs(): Promise<string[]> {
  return loadAllPortfolioSlugsFromFiles();
}

/**
 * Get all portfolio items (for listing page).
 */
export async function getAllPortfolioItems(): Promise<
  Awaited<ReturnType<typeof loadAllPortfolioItemsFromFiles>>
> {
  return loadAllPortfolioItemsFromFiles();
}
