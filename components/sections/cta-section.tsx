import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection({
  ctaHeading = "Let's Build Something Great Together.",
  ctaBody = "I'm currently accepting interviews for flexible roles and freelance projects. Drop me a line, and let's chat about how I can help your team scale.",
}: {
  ctaHeading?: string
  ctaBody?: string
}): React.ReactNode {
  return (
    <section
      className='border-t border-border bg-muted/30 py-16 md:py-24'
      aria-labelledby='cta-heading'
    >
      <div className='container mx-auto flex flex-col items-center px-4 text-center sm:px-6 lg:px-8'>
        <h2
          id='cta-heading'
          className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl'
        >
          {ctaHeading}
        </h2>
        <p className='mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg md:mt-6'>
          {ctaBody}
        </p>
        <Button
          asChild
          size='lg'
          className='mt-8 min-h-14 min-w-[200px] px-8 text-base font-semibold shadow-lg transition-all hover:scale-[1.02] focus-visible:ring-4 md:min-h-16 md:min-w-[240px] md:px-10 md:text-lg'
        >
          <Link href='/contact'>Get In Touch</Link>
        </Button>
      </div>
    </section>
  )
}
