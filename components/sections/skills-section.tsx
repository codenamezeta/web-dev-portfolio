const skillCategories = [
  {
    title: 'Front-End & UI Architecture',
    tagline: 'Building the user-facing product and making it look great.',
    items: [
      {
        label: 'Next.js & React',
        description: 'Dynamic, server-rendered applications.',
      },
      {
        label: 'Tailwind CSS',
        description: 'Rapid, responsive, and maintainable styling.',
      },
      {
        label: 'Three.js',
        description: 'Custom 3D graphics and interactive web experiences.',
      },
      {
        label: 'UI/UX Design Principles',
        description: 'Intuitive navigation and accessibility.',
      },
    ],
  },
  {
    title: 'Back-End & Data Management',
    tagline: 'Managing data and server-side logic.',
    items: [
      { label: 'Payload CMS', description: 'Headless CMS and custom APIs.' },
      {
        label: 'Python',
        description: 'Scripting, backend logic, and versatile problem-solving.',
      },
      {
        label: 'Modern Databases',
        description: 'Supabase and Neon for scalable data storage.',
      },
      {
        label: 'API Integration',
        description: 'Third-party services (REST & GraphQL).',
      },
    ],
  },
  {
    title: 'Engineering Fundamentals & Workflow',
    tagline: 'Formal education and professional workflow—beyond tutorial code.',
    items: [
      {
        label: 'Version Control (GitHub)',
        description: 'Clean commit histories and collaborative workflows.',
      },
      {
        label: 'Agile Problem Solving',
        description: 'Adapting to requirements and debugging systematically.',
      },
      {
        label: 'Responsive Design',
        description: 'Pixel-perfect rendering across all devices.',
      },
    ],
  },
  {
    title: 'Soft Skills',
    tagline: 'Communication, collaboration, and client-focused delivery.',
    items: [
      {
        label: 'Cross-functional communication',
        description:
          'Translating technical concepts for stakeholders and teams.',
      },
      {
        label: 'Documentation & knowledge sharing',
        description: 'Clear specs, runbooks, and handoff materials.',
      },
      {
        label: 'Scope & expectation management',
        description: 'Realistic timelines and proactive updates.',
      },
      {
        label: 'Continuous learning',
        description: 'Staying current with tools and best practices.',
      },
    ],
  },
] as const

export function SkillsSection() {
  return (
    <section
      className='border-t border-border bg-background py-16 md:py-24'
      aria-labelledby='skills-heading'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='mb-12 text-center md:mb-16'>
          <h2
            id='skills-heading'
            className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl'
          >
            The Technical Toolkit
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg'>
            A focused set of technologies and practices that power modern,
            maintainable applications.
          </p>
        </header>

        <ul
          className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'
          role='list'
        >
          {skillCategories.map(({ title, tagline, items }) => (
            <li key={title}>
              <article className='flex h-full flex-col'>
                <h3 className='text-lg font-semibold tracking-tight text-foreground sm:text-xl'>
                  {title}
                </h3>
                <p className='mt-2 text-sm text-muted-foreground'>{tagline}</p>
                <ul
                  className='mt-5 flex flex-1 flex-col list-disc space-y-2 text-sm leading-relaxed text-foreground marker:text-primary sm:space-y-2.5 sm:text-base'
                  role='list'
                >
                  {items.map(({ label, description }) => (
                    <li key={label}>
                      <span className='text-foreground'>
                        {label}
                        <br />
                      </span>{' '}
                      <span className='text-muted-foreground'>
                        {description}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
