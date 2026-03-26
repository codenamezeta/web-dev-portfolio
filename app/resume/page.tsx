'use client'

import { Button } from '@/components/ui/button'
import { DownloadIcon, ExternalLinkIcon, PrinterIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'
import Image from 'next/image'

export default function ResumePage() {
  const handlePrint = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }, [])

  return (
    <main className='container mx-auto relative bg-background flex flex-col-reverse justify-center lg:flex-row print:m-0 print:w-full print:max-w-none print:bg-white print:p-0'>
      {/* Resume Content — full printable width; page margins come from @page in globals.css */}
      <div className='min-h-screen w-full px-4 lg:pb-16 lg:pt-12 sm:px-6 sm:pt-12 lg:px-8 print:min-h-0 print:m-0 print:w-full print:max-w-none print:px-0 print:pt-0 print:pb-0'>
        <div
          id='resume-document'
          className='relative mx-auto w-full max-w-4xl rounded-xl border border-border bg-card/80 px-6 py-8 shadow-2xl backdrop-blur-md sm:px-10 sm:py-10 lg:px-14 lg:py-12 print:mx-0 print:max-w-none print:w-full print:px-6 print:py-6 print:rounded-none print:border-0 print:bg-white print:shadow-none'
        >
          {/* Gradient top bar (screen only) */}
          <div className='pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent to-primary print:hidden' />

          {/* Header */}
          <header className='flex gap-4 border-b border-border pb-6 flex-row sm:items-center sm:gap-8 sm:pb-8 print:border-b print:border-muted-foreground/30 print:pb-4'>
            <div className='flex items-center justify-between gap-4 sm:block'>
              <div className='flex items-center gap-4 sm:gap-5'>
                <div className='relative size-32 shrink-0 overflow-hidden rounded-full border-2 border-primary/40 bg-muted sm:size-24 print:size-20 print:border-primary'>
                  {/* Replace with actual avatar when available */}
                  <Image
                    src='/imgs/avatar-01.jpg'
                    alt='Michael Zeta'
                    width={200}
                    height={200}
                    className='object-cover object-center'
                  />
                </div>
              </div>
            </div>

            <div className='flex-1'>
              <h1 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl print:text-black print:text-[24pt]'>
                Michael Zeta
              </h1>
              <p className='mt-1 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground print:text-primary'>
                Full-Stack Web Developer
              </p>

              <dl className='mt-2 flex flex-col md:flex-row print:flex-row flex-wrap justify-start gap-2 md:gap-4 pr-2 text-xs text-muted-foreground md:text-sm print:text-[10pt]'>
                <div className='flex items-center gap-1.5'>
                  <dt className='sr-only'>Phone</dt>
                  <dd>
                    <a
                      href='tel:+19516621120'
                      className='hover:text-foreground print:text-inherit'
                    >
                      (951) 662-1120
                    </a>
                  </dd>
                </div>
                <div className='flex items-center gap-1.5'>
                  <dt className='sr-only'>Email</dt>
                  <dd>
                    <a
                      href='mailto:michael@a2zeta.com'
                      className='hover:text-foreground print:text-inherit'
                    >
                      michael@a2zeta.com
                    </a>
                  </dd>
                </div>
                <div className='flex items-center gap-1.5'>
                  <dt className='sr-only'>Location</dt>
                  <dd>Rancho Cucamonga, CA</dd>
                </div>
              </dl>
            </div>
          </header>

          {/* Body sections */}
          <div className='mt-8 space-y-8 print:mt-4 print:space-y-4'>
            {/* Professional Summary */}
            <section className='group break-inside-avoid print:break-inside-avoid'>
              <SectionHeading>Professional Summary</SectionHeading>
              <p className='text-sm leading-relaxed text-muted-foreground sm:text-base print:text-[10pt] print:leading-snug print:text-muted-foreground'>
                Full-stack developer and CS-bound student specializing in the
                React ecosystem. Proven track record of building, deploying, and
                maintaining production-ready web applications for real business
                owners. Highly proficient in shipping end-to-end features using{' '}
                <strong className='font-semibold text-foreground print:text-black'>
                  Next.js, TypeScript, Tailwind CSS, and Supabase
                </strong>
                . Passionate about clean UI components, seamless API
                integrations, and contributing to fast-moving, product-led
                startups.
              </p>
            </section>

            {/* Development Experience */}
            <section className='group break-inside-avoid print:break-inside-avoid page-break-before-auto'>
              <SectionHeading>Development Experience</SectionHeading>

              <JobCard>
                <div className='flex flex-wrap items-baseline justify-between gap-2'>
                  <JobTitle>Founder &amp; Lead Full-Stack Developer</JobTitle>
                  <span className='rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground print:text-[7pt]'>
                    Jun 2013 – Present
                  </span>
                </div>
                <JobSubtitle>
                  A2Zeta Creative Design · Rancho Cucamonga, CA
                </JobSubtitle>
                <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base print:text-[10pt] print:leading-snug'>
                  <li>
                    Architect custom web solutions for local businesses,
                    translating vague client requirements into functional,
                    code-based reality using modern JavaScript frameworks.
                  </li>
                  <li>
                    Build and refine frontend UI components, ensuring
                    accessibility, performance optimization, and cross-browser
                    compatibility.
                  </li>
                  <li>
                    Manage the complete software development lifecycle (SDLC)
                    from UI wireframing to backend deployment, utilizing Agile
                    methodologies to ship real features on tight deadlines.
                  </li>
                </ul>
              </JobCard>

              <JobCard>
                <div className='flex flex-wrap items-baseline justify-between gap-2'>
                  <JobTitle>Technical Project Lead (Contract)</JobTitle>
                  <span className='rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground print:text-[7pt]'>
                    Jun 2021 – Jan 2022
                  </span>
                </div>
                <JobSubtitle>
                  Valiant Eagle, Inc. · Los Angeles, CA (Hybrid)
                </JobSubtitle>
                <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base print:text-[10pt] print:leading-snug'>
                  <li>
                    Designed a modular &quot;assembly line&quot; workflow for
                    web development, establishing clear hand-off protocols
                    between UX design, frontend development, and DevOps teams.
                  </li>
                  <li>
                    Audited existing technology stacks and provided strategic
                    documentation to leadership regarding the integration of
                    modern headless CMS and e-commerce solutions.
                  </li>
                </ul>
              </JobCard>
            </section>

            {/* Education */}
            <section className='group break-inside-avoid print:break-inside-avoid'>
              <SectionHeading>Education</SectionHeading>

              <JobCard>
                <div className='flex flex-wrap items-baseline justify-between gap-2'>
                  <JobTitle>Chaffey College · Rancho Cucamonga, CA</JobTitle>
                  <span className='rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground print:text-[7pt]'>
                    Expected: June 2027
                  </span>
                </div>
                <JobSubtitle>
                  Business Administration 2.0 with Computer Information Systems
                  Emphasis (Planned transfer: CS at Cal Poly Pomona)
                </JobSubtitle>
                <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base print:text-[10pt] print:leading-snug'>
                  <li>
                    <strong className='font-semibold text-foreground print:text-black'>
                      Cumulative GPA:
                    </strong>{' '}
                    3.94 (Dean&apos;s List)
                  </li>
                  <li>
                    <strong className='font-semibold text-foreground print:text-black'>
                      CIS coursework:
                    </strong>{' '}
                    Intro to Computer Programming, Programming Concepts &amp;
                    Methodology, Calculus I.
                  </li>
                  <li>
                    <strong className='font-semibold text-foreground print:text-black'>
                      Leadership:
                    </strong>{' '}
                    Phi Theta Kappa Honors Society Member, Vice President of the
                    Recording Arts Club.
                  </li>
                </ul>
              </JobCard>
            </section>

            {/* Technical Stack */}
            <section className='group break-inside-avoid print:break-inside-avoid print:pt-6'>
              <SectionHeading>Technical Stack</SectionHeading>
              <div className='grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:text-base md:grid-cols-3 print:grid-cols-3 print:gap-1 print:text-[8pt]'>
                {[
                  'Next.js & React',
                  'TypeScript / JavaScript',
                  'Tailwind CSS',
                  'Supabase & PostgreSQL',
                  'SEO & JSON-LD',
                  'Git / GitHub',
                  'Netlify & Vercel',
                  'API & Webhooks',
                  'UX/UI Design',
                  'CMS (Payload / Sanity)',
                  'Agile Methodologies',
                  'Conversion Funnels',
                ].map((skill) => (
                  <div
                    key={skill}
                    className='flex items-center rounded-sm border border-border bg-muted/40 px-3 py-2 text-foreground shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-primary hover:bg-muted/70 print:border-border/50 print:bg-slate-50 print:text-black/70 print:shadow-none print:hover:translate-y-0 print:p-2'
                  >
                    <span className='mr-2 text-primary'>▹</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Full-Stack Projects */}
            <section className='group break-inside-avoid print:break-inside-avoid'>
              <SectionHeading>Full-Stack Projects</SectionHeading>

              <JobCard>
                <JobTitle>The Second Messenger Web Platform</JobTitle>
                <JobSubtitle>Independent Full-Stack Application</JobSubtitle>
                <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base print:text-[10pt] print:leading-snug'>
                  <li>
                    Architected and built a highly performant, server-side
                    rendered website utilizing{' '}
                    <strong className='font-semibold text-foreground print:text-black'>
                      Next.js
                    </strong>{' '}
                    and{' '}
                    <strong className='font-semibold text-foreground print:text-black'>
                      Tailwind CSS
                    </strong>{' '}
                    to manage a multimedia brand.
                  </li>
                  <li>
                    Configured a custom backend using{' '}
                    <strong className='font-semibold text-foreground print:text-black'>
                      Payload CMS
                    </strong>{' '}
                    and integrated external databases for dynamic content
                    delivery and asset management.
                  </li>
                  <li>
                    Designed a responsive, modern UI/UX resulting in seamless
                    media playback and content discovery across all devices.
                  </li>
                </ul>
              </JobCard>

              <JobCard>
                <JobTitle>Rockstars of Tomorrow Digital Operations</JobTitle>
                <JobSubtitle>B2B SaaS Integration &amp; Web App</JobSubtitle>
                <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base print:text-[10pt] print:leading-snug'>
                  <li>
                    Led the digital transformation of a brick-and-mortar
                    business, designing and deploying a responsive frontend
                    using{' '}
                    <strong className='font-semibold text-foreground print:text-black'>
                      Next.js
                    </strong>{' '}
                    and Netlify.
                  </li>
                  <li>
                    Built a custom eCommerce portal with full{' '}
                    <strong className='font-semibold text-foreground print:text-black'>
                      Stripe API
                    </strong>{' '}
                    integration to handle summer camp registrations, creating a
                    fully automated, passive revenue stream.
                  </li>
                  <li>
                    Engineered complex API integrations to synchronize the
                    frontend with &quot;Opus One&quot; (third-party business
                    logic software), streamlining lead capture and client
                    scheduling.
                  </li>
                </ul>
              </JobCard>
            </section>

            {/* Links */}
            <section className='group break-inside-avoid print:break-inside-avoid'>
              <SectionHeading>Links</SectionHeading>
              <ul className='flex flex-wrap gap-3 text-sm sm:gap-4 sm:text-base print:flex-col print:gap-2 print:text-[9pt]'>
                <li>
                  <a
                    href='https://a2zeta.com'
                    className='inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-muted/70 print:border-0 print:bg-transparent print:shadow-none print:px-0 print:py-0 print:hover:translate-y-0 print:text-black/70'
                  >
                    Web Development Portfolio{' '}
                    <ExternalLinkIcon className='size-4 print:hidden' />
                    <span className='hidden text-xs text-muted-foreground print:inline-block print:text-[9pt]'>
                      a2zeta.com
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href='https://github.com/codenamezeta'
                    className='inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-muted/70 print:border-0 print:bg-transparent print:shadow-none print:px-0 print:py-0 print:hover:translate-y-0 print:text-black/70'
                  >
                    GitHub Profile{' '}
                    <ExternalLinkIcon className='size-4 print:hidden' />
                    <span className='hidden text-xs text-muted-foreground print:inline-block print:text-[9pt]'>
                      github.com/codenamezeta
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.linkedin.com/in/codenamezeta/'
                    className='inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-muted/70 print:border-0 print:bg-transparent print:shadow-none print:px-0 print:py-0 print:hover:translate-y-0 print:text-black/70'
                  >
                    LinkedIn{' '}
                    <ExternalLinkIcon className='size-4 print:hidden' />
                    <span className='hidden text-xs text-muted-foreground print:inline-block print:text-[9pt]'>
                      linkedin.com/in/codenamezeta
                    </span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      {/* Screen-only control panel */}
      <div className='pointer-events-none z-40 block px-4 lg:px-0'>
        <div className='pointer-events-auto flex flex-col gap-3 py-4 relative lg:top-24 lg:sticky print:hidden'>
          <Button
            type='button'
            variant='outline'
            size='lg'
            onClick={handlePrint}
            className='text-xl p-6'
          >
            Print Resume <PrinterIcon className='size-4' />
          </Button>
          <Button asChild size='lg' className='text-xl p-6'>
            <Link href='/Michael Zeta Full-Stack Web Developer.pdf' download>
              Download PDF <DownloadIcon className='size-4' />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

type SectionHeadingProps = {
  children: React.ReactNode
}

function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className='inline-block text-lg font-semibold tracking-tight text-foreground mb-2 sm:text-xl print:text-[12pt] print:text-primary'>
      <span className='relative inline-block pb-1'>
        {children}
        <span className='absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-linear-to-r from-accent to-primary transition-all duration-200 group-hover:w-full print:hidden' />
      </span>
    </h2>
  )
}

type JobCardProps = {
  children: React.ReactNode
}

function JobCard({ children }: JobCardProps) {
  return (
    <article className='mb-5 rounded-sm border border-border/50 bg-muted/30 px-4 py-4 shadow-sm transition-transform duration-150 hover:-translate-y-1 sm:px-5 sm:py-5 last:mb-0 print:mb-3 print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0 print:shadow-none print:hover:translate-y-0 print:break-inside-avoid print:text-[10pt]'>
      {children}
    </article>
  )
}

type JobTitleProps = {
  children: React.ReactNode
}

function JobTitle({ children }: JobTitleProps) {
  return (
    <h3 className='text-base font-semibold tracking-tight text-foreground sm:text-lg print:text-[11pt] print:text-black'>
      {children}
    </h3>
  )
}

type JobSubtitleProps = {
  children: React.ReactNode
}

function JobSubtitle({ children }: JobSubtitleProps) {
  return (
    <p className='mt-1 text-xs font-medium text-primary sm:text-sm print:text-[8pt] print:text-slate-700 max-w-[45ch] text-wrap'>
      {children}
    </p>
  )
}
