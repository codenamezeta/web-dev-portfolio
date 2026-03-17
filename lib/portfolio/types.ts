/**
 * Portfolio item category.
 */
export type PortfolioCategory = "Client" | "Personal" | "Learning";

/**
 * Content block types for case study body.
 */
export type CaseStudyBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3 | 4; content: string }
  | { type: "code"; language: string; code: string; filename?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "embed"; url: string; title?: string }; // iframe embed (e.g. CodePen, YouTube)

/**
 * Frontmatter shape for Markdown portfolio files (content/portfolio/*.md).
 */
export interface PortfolioFrontmatter {
  title: string;
  category: PortfolioCategory;
  publishedAt: string; // YYYY-MM-DD for reliable parsing
  liveUrl?: string;
  sourceUrl?: string;
  /** Main/hero image for the project. */
  image?: string;
  /** Thumbnail for listings; used as fallback when image is not set. */
  thumbnail?: string;
  /** Comma-separated or array of tech/keyword tags for display on cards. */
  keywords?: string | string[];
  /** Optional order when sorting by "Featured" (lower = higher priority). */
  featuredOrder?: number;
  description: string;
}

/**
 * Portfolio item as used on listing and detail pages.
 * Either `content` (Markdown string from .md files) or `caseStudy` (blocks) is set.
 */
export interface PortfolioItem {
  slug: string;
  title: string;
  category: PortfolioCategory;
  publishedAt: Date;
  liveUrl?: string;
  sourceUrl?: string;
  image?: string;
  /** Technology/keyword tags for card badges. */
  keywords: string[];
  /** Optional order when sorting by "Featured" (lower = higher priority). */
  featuredOrder?: number;
  description: string;
  /** Case study as Markdown (when loaded from content/portfolio/*.md). */
  content?: string;
  /** Case study as structured blocks (legacy / programmatic). */
  caseStudy?: CaseStudyBlock[];
}
