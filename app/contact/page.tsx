import { Metadata } from 'next'
import { ContactIntro } from '@/components/contact-intro'
import { ContactForm } from '@/components/contact-form'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact | Michael Zeta',
  description:
    'Get in touch with Michael Zeta for full-time, part-time, or freelance web development opportunities remotely or on-site. Based in Rancho Cucamonga, serving the Inland Empire, Orange County, and Los Angeles County.',
}

export default function ContactPage() {
  return (
    <main
      className='min-h-[calc(100vh-(--spacing(14)))] bg-background'
      id='contact'
    >
      <div
        className={cn(
          'container mx-auto grid gap-12 px-4 py-16',
          'md:grid-cols-2 md:gap-16 md:px-6 md:py-20',
          'lg:gap-20 lg:px-8',
        )}
      >
        <section
          className='flex flex-col justify-center'
          aria-labelledby='contact-heading'
        >
          <ContactIntro />
        </section>

        <section
          className='flex flex-col justify-center'
          aria-label='Contact form'
        >
          <div className='rounded-xl border border-border bg-card p-6 shadow-sm md:p-8'>
            <h2 className='sr-only'>Send a message</h2>
            <ContactForm />
          </div>
        </section>
      </div>
    </main>
  )
}
