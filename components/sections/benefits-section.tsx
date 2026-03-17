import { TrendingUp, Users2, Rocket } from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    headline: 'Strategic, Business-Aligned Development',
    copy: "You aren't just getting someone who writes code in a vacuum; you're getting a developer who understands how technical execution drives business objectives. Every application, UI choice, and database structure is engineered to provide measurable value, improve workflows, and scale with the company's goals.",
  },
  {
    icon: Users2,
    headline: 'A Multiplier for Your Engineering Team',
    copy: "Avoid the bottlenecks caused by siloed developers. You gain a highly communicative team member who excels at breaking down complex concepts, documenting processes, and fostering a collaborative environment. Whether it's pairing on a difficult bug or explaining a technical constraint to stakeholders, cross-team synergy is guaranteed.",
  },
  {
    icon: Rocket,
    headline: 'Modern Architecture Built to Last',
    copy: "Stop worrying about technical debt and outdated legacy code. You get robust, performant web applications built on modern, industry-standard frameworks. The focus is always on writing clean, maintainable logic that not only solves today's problems but is structurally sound enough to scale for tomorrow's traffic.",
  },
] as const

export function BenefitsSection() {
  return (
    <section
      className='border-t border-border bg-muted/30 py-16 md:py-24'
      aria-labelledby='benefits-heading'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* <header className="mb-12 text-center md:mb-16">
          <h2
            id="benefits-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Benefits
          </h2>
        </header> */}

        <ul
          className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'
          role='list'
        >
          {benefits.map(({ icon: Icon, headline, copy }) => (
            <li key={headline} className='flex flex-col items-start text-left'>
              <div
                className='mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary'
                aria-hidden
              >
                <Icon className='h-6 w-6' aria-hidden />
              </div>
              <h3 className='text-lg font-semibold tracking-tight text-foreground sm:text-xl'>
                {headline}
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base'>
                {copy}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
