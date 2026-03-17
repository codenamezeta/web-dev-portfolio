import Image from "next/image";
import type { CaseStudyBlock } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

interface CaseStudyContentProps {
  blocks: CaseStudyBlock[];
  className?: string;
}

function Block({ block, index }: { block: CaseStudyBlock; index: number }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-muted-foreground leading-relaxed">
          {block.content}
        </p>
      );
    case "heading": {
      const Tag = `h${block.level}` as "h2" | "h3" | "h4";
      return (
        <Tag
          className={cn(
            "font-semibold text-foreground scroll-mt-20",
            block.level === 2 && "mt-10 mb-4 text-xl sm:text-2xl",
            block.level === 3 && "mt-8 mb-3 text-lg sm:text-xl",
            block.level === 4 && "mt-6 mb-2 text-base sm:text-lg"
          )}
        >
          {block.content}
        </Tag>
      );
    }
    case "code":
      return (
        <figure className="my-6 overflow-hidden rounded-lg border border-border bg-muted/50">
          {block.filename && (
            <figcaption className="border-b border-border bg-muted/30 px-4 py-2 font-mono text-xs text-muted-foreground">
              {block.filename}
            </figcaption>
          )}
          <pre className="overflow-x-auto p-4 text-sm">
            <code
              className="font-mono text-foreground"
              data-language={block.language}
            >
              {block.code}
            </code>
          </pre>
        </figure>
      );
    case "image":
      return (
        <figure className="my-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "embed":
      return (
        <figure className="my-6 overflow-hidden rounded-lg border border-border bg-muted/30">
          <div className="relative aspect-video w-full">
            <iframe
              src={block.url}
              title={block.title ?? "Embedded content"}
              className="absolute inset-0 size-full"
              allowFullScreen
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
          {block.title && (
            <figcaption className="border-t border-border bg-muted/30 px-4 py-2 text-sm text-muted-foreground">
              {block.title}
            </figcaption>
          )}
        </figure>
      );
    default: {
      const _exhaustive: never = block;
      return null;
    }
  }
}

export function CaseStudyContent({ blocks, className }: CaseStudyContentProps) {
  return (
    <article className={cn("prose-case-study", className)}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} index={index} />
      ))}
    </article>
  );
}
