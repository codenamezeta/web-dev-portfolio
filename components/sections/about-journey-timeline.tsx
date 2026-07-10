import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'

const journeyItems = [
  {
    id: 'educator',
    label: 'The Educator',
    timeframe: '10+ Years',
    where: 'Rockstars of Tomorrow',
    milestone:
      'Spent over a decade as a music instructor, mastering the art of breaking down complex concepts, mentoring students, and developing elite communication and patience skills.',
  },
  {
    id: 'founder',
    label: 'The Founder',
    timeframe: '2013 – Present',
    where: 'A2Zeta Creative Design',
    milestone:
      'Launched a freelance web agency to help local businesses scale. Handled the complete software development lifecycle, architecting custom web solutions and complex frontend UIs using modern JavaScript frameworks.',
  },
  {
    id: 'project-lead',
    label: 'The Project Lead',
    timeframe: '2021 – 2022',
    where: 'Valiant Eagle, Inc.',
    milestone:
      'Stepped into a Technical Project Lead contract role. Designed modular workflows between UX, frontend, and DevOps teams, gaining invaluable experience in cross-team collaboration and tech stack auditing.',
  },
  {
    id: 'engineer',
    label: 'The Engineer',
    timeframe: 'Present',
    where: 'Chaffey College (Transferring to Cal Poly Pomona)',
    milestone:
      'Currently backing up a decade of self-taught, real-world development experience with formal Computer Science education. Maintaining a 3.94 GPA while mastering the React ecosystem (Next.js, TypeScript, Tailwind) and building daily with Cursor and agentic coding tools to prepare for a collaborative engineering role.',
  },
] as const

export function AboutJourneyTimeline() {
  return (
    <section
      className='border-b border-border bg-background py-16 md:py-24'
      aria-labelledby='journey-timeline-heading'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='mb-12 max-w-3xl md:mb-16'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
            The Journey Timeline
          </p>
          <h2
            id='journey-timeline-heading'
            className='mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl'
          >
            How a I became a full-stack engineer.
          </h2>
          <p className='my-4 text-sm leading-relaxed text-muted-foreground sm:text-base'>
            A high-level look at the milestones that shaped my engineering
            approach—from teaching and entrepreneurship to technical leadership
            and formal computer science.
          </p>
          <Link
            href='/resume'
            className={buttonVariants({ variant: 'default', size: 'lg' })}
          >
            View My Resume <ArrowRight data-icon='inline-end' aria-hidden />
          </Link>
        </header>

        <ol
          className='relative border-l border-border pl-6 sm:pl-8 lg:pl-10'
          aria-label='Timeline of Michael Zeta’s journey as a web developer'
        >
          {journeyItems.map((item, index) => (
            <li
              key={item.id}
              className='group mb-10 last:mb-0 lg:mb-12'
              aria-label={`${item.label}, ${item.timeframe}`}
            >
              <div className='absolute -left-[0.6rem] mt-2 flex size-4 items-center justify-center rounded-full border border-border bg-background sm:size-5'>
                <span className='size-2 rounded-full bg-primary sm:size-2.5' />
              </div>

              <article className='rounded-xl border border-border bg-muted px-4 py-4 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 sm:px-6 sm:py-5'>
                <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className='text-lg font-semibold tracking-tight text-foreground sm:text-xl'>
                      {item.label}
                    </h3>
                  </div>
                  <p className='text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.7rem]'>
                    {item.timeframe}
                  </p>
                </div>

                <dl className='mt-3 space-y-1.5 text-sm sm:mt-4 sm:text-base'>
                  <div className='flex flex-wrap gap-2 text-muted-foreground'>
                    <dt className='font-medium text-foreground'>Where</dt>
                    <dd className='text-muted-foreground'>· {item.where}</dd>
                  </div>
                  <div>
                    <dt className='sr-only'>Milestone</dt>
                    <dd className='leading-relaxed text-muted-foreground'>
                      {item.milestone}
                    </dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
