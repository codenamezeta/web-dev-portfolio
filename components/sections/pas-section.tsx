export function PASSection() {
  return (
    <section
      className="border-t border-border bg-background py-16 md:py-24"
      aria-labelledby="pas-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center md:mb-16">
          <h2
            id="pas-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Great code is only half the equation.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
            It&apos;s hard to find an engineer who understands how front-end
            user experience, back-end logic, and business goals all have to
            harmonize.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            {/* 16:9 video placeholder */}
            <div
              className="flex h-full w-full items-center justify-center text-muted-foreground"
              aria-hidden
            >
              <span className="text-sm">Video placeholder</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              Hiring a developer who only speaks code often leads to technical
              solutions that completely miss the actual business objective. You
              need someone who understands the &quot;why&quot; behind the
              project, not just the &quot;how.&quot; Code that doesn&apos;t
              serve the user or the business&apos; bottom line is wasted
              effort.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              By blending a deep focus on computer information systems and
              business administration with hands-on technical consulting, I
              bridge the gap between business needs and technical execution.
              Whether I&apos;m building a custom content management system or
              designing intuitive user interfaces, I engineer solutions that
              solve real-world problems and drive measurable results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
