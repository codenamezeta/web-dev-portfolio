import Image from "next/image";
import { Quote } from "lucide-react";

/**
 * Replace these with real testimonials when ready.
 * Add `image` (path under /public or URL) when you have headshots; otherwise
 * `initials` is used for the avatar placeholder.
 */
const testimonials = [
  {
    quote:
      "Placeholder testimonial about delivery, communication, and technical quality. Swap this with a real quote from a client or colleague.",
    name: "Jane Doe",
    role: "Role or Company",
    initials: "JD",
    image: undefined as string | undefined,
  },
  {
    quote:
      "Another placeholder quote highlighting collaboration and business-aligned solutions. Replace with an actual endorsement.",
    name: "John Smith",
    role: "Role or Company",
    initials: "JS",
    image: undefined as string | undefined,
  },
  {
    quote:
      "Third placeholder for a testimonial focused on expertise and results. Add your real testimonial text and attribution here.",
    name: "Alex Chen",
    role: "Role or Company",
    initials: "AC",
    image: undefined as string | undefined,
  },
] as const;

export function TestimonialsSection() {
  return (
    <section
      className="border-t border-border bg-muted/30 py-16 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center md:mb-16">
          <h2
            id="testimonials-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Testimonials &amp; Endorsements
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            What clients and colleagues say about working together.
          </p>
        </header>

        <ul
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {testimonials.map(({ quote, name, role, initials, image }) => (
            <li key={name}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/20 hover:shadow-md md:p-8">
                <Quote
                  className="mb-4 h-10 w-10 shrink-0 text-primary/60"
                  aria-hidden
                />
                <blockquote className="flex flex-1 flex-col">
                  <p className="text-base leading-relaxed text-foreground sm:text-lg">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    {image ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                        <Image
                          src={image}
                          alt=""
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-primary/10 text-sm font-semibold text-primary"
                        aria-hidden
                      >
                        {initials}
                      </div>
                    )}
                    <div>
                      <cite className="not-italic">
                        <span className="block font-semibold text-foreground">
                          {name}
                        </span>
                        <span className="block text-sm text-muted-foreground">
                          {role}
                        </span>
                      </cite>
                    </div>
                  </footer>
                </blockquote>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
