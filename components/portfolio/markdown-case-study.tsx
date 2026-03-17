import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";
import { ImageWithLightbox } from "./image-with-lightbox";
import { ImageCarouselWrapper } from "./image-carousel-wrapper";
import { rehypeImageCarousel } from "@/lib/rehype-image-carousel";

interface MarkdownCaseStudyProps {
  content: string;
  className?: string;
}

export function MarkdownCaseStudy({ content, className }: MarkdownCaseStudyProps) {
  const components: Components = {
    p: ({ children }) => {
      // Avoid <p> wrapping our custom img (which renders <figure><div>) — invalid HTML and causes hydration error
      const childArray = React.Children.toArray(children);
      const onlyChild =
        childArray.length === 1 && React.isValidElement(childArray[0])
          ? (childArray[0] as React.ReactElement)
          : null;
      const isOnlyImage =
        onlyChild &&
        (onlyChild.type === "figure" ||
          onlyChild.type === "img" ||
          (typeof onlyChild.props === "object" && onlyChild.props !== null && "src" in onlyChild.props));
      if (isOnlyImage) {
        return <>{children}</>;
      }
      return (
        <p className="text-muted-foreground leading-relaxed">{children}</p>
      );
    },
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 scroll-mt-20 text-xl font-semibold text-foreground sm:text-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 scroll-mt-20 text-lg font-semibold text-foreground sm:text-xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 scroll-mt-20 text-base font-semibold text-foreground sm:text-lg">
        {children}
      </h4>
    ),
    code: ({ className: codeClassName, children, ...props }) => {
      const isBlock =
        (codeClassName?.startsWith("language-") ?? false) ||
        String(children).includes("\n");
      if (isBlock) {
        const match = /language-(\w+)/.exec(codeClassName ?? "");
        const language = match?.[1] ?? "text";
        return (
          <figure className="my-6 overflow-hidden rounded-lg border border-border bg-muted/50">
            <pre className="overflow-x-auto p-4 text-sm">
              <code
                className="font-mono text-foreground"
                data-language={language}
                {...props}
              >
                {children}
              </code>
            </pre>
          </figure>
        );
      }
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => <>{children}</>,
    img: ({ src, alt }) => {
      const srcStr = typeof src === "string" ? src : "";
      if (!srcStr) return null;
      return (
        <ImageWithLightbox
          src={srcStr}
          alt={alt ?? ""}
        />
      );
    },
    div: ({ node, children, ...rest }) => {
      const isCarousel =
        node?.properties?.dataCarousel === "true" ||
        node?.properties?.dataCarousel === true;
      if (isCarousel) {
        return <ImageCarouselWrapper>{children}</ImageCarouselWrapper>;
      }
      return <div {...rest}>{children}</div>;
    },
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="my-4 list-disc space-y-1 pl-6 text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 list-decimal space-y-1 pl-6 text-muted-foreground">
        {children}
      </ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-primary/30 border-l-4 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  };

  return (
    <article className={cn("markdown-case-study", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeImageCarousel, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
