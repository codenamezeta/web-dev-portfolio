import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqItems = [
  {
    question: 'What kind of roles are you currently looking for?',
    answer:
      "I'm actively looking for freelance, contract, or part-time roles where I can jump in and make an immediate impact. I am also open to full-time positions, provided there is some flexibility. Because I am currently completing my degree, the traditional 9-to-5, Monday-through-Friday desk schedule is a bit tricky. However, if your team values strong communication and high-quality output over rigid clock-punching, we will be a great fit!",
  },
  {
    question: 'Are you looking for remote, hybrid, or on-site work?',
    answer:
      "I actually prefer hybrid or on-site work! While I'm fully equipped to thrive in a remote environment, I genuinely enjoy the camaraderie and collaborative energy of a shared workspace. Plus, if we only ever see each other on Zoom, your team will never get to try my famous homemade cold brew (or a fresh batch of my signature Zeta cookies). I'm based in Rancho Cucamonga and am highly open to commuting throughout the Inland Empire, Los Angeles, or down into the Orange County and Irvine tech hubs for the right opportunity.",
  },
  {
    question: 'How do you balance your workflow with your ongoing education?',
    answer:
      "Finishing my degree—and my upcoming transfer to Cal Poly Pomona to continue my computer science studies—is a major priority for me, but I am highly resourceful when it comes to time management. I routinely structure my class schedule with night and online courses to free up core business hours, and I am entirely comfortable working evenings or weekends. I'm looking to partner with an employer who respects that educational drive. In return, you get a developer who brings that same relentless dedication and continuous learning to your codebase.",
  },
  {
    question: 'What does your preferred tech stack look like?',
    answer:
      "I do my best work in the React ecosystem, specifically building with Next.js and TypeScript, often paired with headless CMSs like Payload or Sanity. I also have a solid foundation in Python, C++, and database management (Postgres, Supabase, Firebase). While I have plenty of past experience navigating the wild world of WordPress, my heart truly belongs in a modern IDE like VSCode or Cursor. I'm an absolute sponge for new tech, so exploring frameworks like Solid.js and Svelte is next on my hit list.",
  },
  {
    question:
      'You have a background outside of tech. How does that influence your development?',
    answer:
      'Before pivoting to software engineering, I spent over a decade as a music instructor. Teaching taught me how to take incredibly complex, abstract concepts and break them down into digestible pieces for anyone to understand. It gave me endless patience, a knack for mentorship, and hyper-refined communication skills—all of which I use every day when collaborating with stakeholders, writing documentation, or pair-programming.',
  },
  {
    question: 'Do you do UI/UX design, or strictly development?',
    answer:
      "I am a developer first, but I have a deep appreciation for the visual side of the web. I'm very comfortable stepping into tools like the Adobe Suite, Figma, or Webflow to extract assets, tweak layouts, and ensure the final code is pixel-perfect and accessible. I love working closely with designers to make sure their vision translates beautifully to the browser.",
  },
] as const

export function FAQSection() {
  return (
    <section
      className='border-t border-border bg-background py-16 md:py-24'
      aria-labelledby='faq-heading'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='mb-10 text-center md:mb-12'>
          <h2
            id='faq-heading'
            className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl'
          >
            Frequently Asked Questions
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg'>
            Common questions about how I work and what I’m looking for.
          </p>
        </header>

        <Accordion
          type='single'
          collapsible
          className='mx-auto max-w-3xl border border-border rounded-lg bg-card px-4 shadow-sm md:px-6'
        >
          {faqItems.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`faq-${index}`}>
              <AccordionTrigger className='py-5 text-left text-base font-semibold sm:text-lg data-[state=open]:border-b data-[state=open]:border-border data-[state=open]:pb-4'>
                {question}
              </AccordionTrigger>
              <AccordionContent className='pb-5 text-muted-foreground leading-relaxed'>
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
