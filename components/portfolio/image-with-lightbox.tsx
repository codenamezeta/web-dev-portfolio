"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageWithLightboxProps {
  src: string;
  alt: string;
  className?: string;
  figureClassName?: string;
  priority?: boolean;
}

export function ImageWithLightbox({
  src,
  alt,
  className,
  figureClassName,
  priority = false,
}: ImageWithLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <figure className={cn("my-6", figureClassName, className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full cursor-zoom-in rounded-lg border border-border overflow-hidden bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`View larger: ${alt || "Image"}`}
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              priority={priority}
            />
          </div>
        </button>
        {alt && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {alt}
          </figcaption>
        )}
      </figure>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-screen max-w-[100vw] h-screen max-h-screen sm:max-w-[100vw] p-0 gap-0 overflow-hidden border-0 bg-transparent shadow-none rounded-none flex items-center justify-center cursor-default"
          showCloseButton={true}
          onClick={() => setOpen(false)}
        >
          <DialogTitle className="sr-only">
            {alt || "Enlarged image"}
          </DialogTitle>
          {/* Native img so JPG and all formats display; fills 90vw×90vh so image scales to full width or height. Click/tap anywhere (including image) closes. */}
          <div className="w-[90vw] h-[90vh] min-w-0 min-h-0 flex items-center justify-center cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full w-full h-full object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
