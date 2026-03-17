"use client";

import Link from "next/link";
import TiltedCard from "@/components/TiltedCard";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%236b7280' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='system-ui' font-size='18' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EProject%3C/text%3E%3C/svg%3E";

export interface PortfolioOverviewCardProps {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

export function PortfolioOverviewCard({
  slug,
  title,
  description,
  image,
}: PortfolioOverviewCardProps) {
  const imageSrc = image ?? PLACEHOLDER_IMAGE;

  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
      aria-label={`View case study: ${title}`}
    >
      <TiltedCard
        imageSrc={imageSrc}
        altText={title}
        captionText={title}
        containerHeight="280px"
        containerWidth="100%"
        imageHeight="260px"
        imageWidth="100%"
        scaleOnHover={1.05}
        rotateAmplitude={12}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={false}
      />
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {description}
      </p>
    </Link>
  );
}
