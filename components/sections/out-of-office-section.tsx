import Image from 'next/image'

const outOfOfficeItems = [
  {
    heading: 'The Modern Rock Musician',
    body: 'Before diving into software engineering, I spent over a decade as a music teacher. I play guitar, bass, piano, and drums, and I currently spend my free time writing and producing an original sci-fi-themed music project called The Second Messenger. It turns out that mixing a multi-track recording uses the exact same problem-solving muscles as balancing a full-stack application!',
    image: '/imgs/guitar-01.jpg' as string | undefined,
  },
  {
    heading: 'The Out-of-Office Explorer',
    body: "I'm a big believer in logging off to recharge. Whether it's hiking through the stunning trails of Yosemite, exploring the streets of Rome, or taking a road trip to catch a solar eclipse, I love getting out and seeing the world with my wife.",
    image: '/imgs/yosemite-01.jpg' as string | undefined,
  },
  {
    heading: 'The Chief Morale Officer',
    body: "Meet Korra, my Labrador Retriever. While her TypeScript skills are practically non-existent, she excels at her role as my lead debugging specialist. She's an absolute pro at reminding me to step away from the IDE, take a walk outside, and come back to a complex problem with a fresh pair of eyes.",
    image: '/imgs/korra-01.jpg' as string | undefined,
  },
] as const

export function OutOfOfficeSection() {
  return (
    <section
      className='border-t border-border bg-background py-16 md:py-24'
      aria-labelledby='out-of-office-heading'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='mb-12 text-center md:mb-16'>
          <h2
            id='out-of-office-heading'
            className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl'
          >
            When I&apos;m Not Coding
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg'>
            A little about who I am outside the IDE—perfect icebreaker material
            for our first call.
          </p>
        </header>

        <ul
          className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'
          role='list'
        >
          {outOfOfficeItems.map(({ heading, body, image }) => (
            <li key={heading} className='flex flex-col'>
              <div className='aspect-4/3 w-full overflow-hidden rounded-lg border border-border bg-muted'>
                {image ? (
                  <Image
                    src={image}
                    alt=''
                    width={400}
                    height={300}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div
                    className='flex h-full w-full items-center justify-center text-muted-foreground text-sm'
                    aria-hidden
                  >
                    Photo placeholder
                  </div>
                )}
              </div>
              <h3 className='mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl'>
                {heading}
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base'>
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
