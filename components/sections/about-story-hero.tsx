'use client'

import Image from 'next/image'
import Grainient from '@/components/Grainient'

const storyParagraphs = [
  "Hello, I'm Michael Zeta, a professional computer nerd and freelance full-stack developer specializing in bold, efficiency-driven designs supercharged by modern and innovative technologies.",
  "My love for web design began as a teenager when I learned to play the guitar and joined a band. Becoming a musician imparted me with an extraordinary penchant for art and creativity. Later, in college, I discovered the power of the DIY mentality that many of my fellow musicians and I were leveraging to achieve success in the music business. We understood the advantage of learning to create trade assets like songs, records, music videos, and especially websites ourselves. Building simple landing pages for my early-days music projects was my first introduction to the expansive digital design world. I witnessed first-hand as the internet blossomed into a powerful utility for uniting content creators and entrepreneurs with their fans, customers, and supporters all around the world on an unprecedented scale. As businesses' needs for a robust web presence increased in the following years, many in my network began asking me for guidance scaling their technology systems and automating their work-flow. It wasn't long before I had developed a reputation for consistent quality and excellence.",
  'Building A2Zeta Creative Design from a modest side-hustle into a successful freelance business was an incredible proving ground. It taught me exactly how to bridge the gap between technical execution and real-world business goals, and how to build end-to-end solutions from scratch. But as my technical skills grew, my ambitions shifted. I realized that flying solo meant missing out on the camaraderie, mentorship, and shared energy that comes from working alongside a dedicated team.',
  'Now, I am writing the next chapter. To back up my self-taught foundation, I am actively pursuing my computer science degree and seeking an internship or full-time engineering role—especially mission-driven projects that connect communities, local businesses, and meaningful causes. My goal is to take off the "solo agency owner" hat and bring my entrepreneurial mindset to a collaborative environment. I want to tackle complex architecture, learn from brilliant peers, and write code that makes a massive impact together.',
] as const

export function AboutStoryHero() {
  return (
    <section
      className='border-b border-border bg-background py-16 md:py-24'
      aria-labelledby='about-story-heading'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-12 xl:items-start'>
          <div className='order-2 lg:col-span-4 xl:order-1 xl:col-span-5'>
            <div className='relative aspect-9/16 w-full overflow-hidden rounded-2xl border border-primary bg-muted'>
              <Grainient
                color1='#174c47'
                color2='#445566'
                color3='#865890'
                timeSpeed={0.33}
                colorBalance={0}
                warpStrength={1}
                warpFrequency={5}
                warpSpeed={2}
                warpAmplitude={50}
                blendAngle={10}
                blendSoftness={0.05}
                rotationAmount={500}
                noiseScale={2}
                grainAmount={0.1}
                grainScale={2}
                grainAnimated={false}
                contrast={1.5}
                gamma={1}
                saturation={0.5}
                centerX={0}
                centerY={0}
                zoom={0.7}
              />
              <Image
                src='/imgs/selfie.png'
                alt='Portrait of Michael Zeta'
                fill
                sizes='810px x 1440px'
                className='object-cover'
              />
            </div>
          </div>

          <div className='order-1 flex flex-col gap-6 lg:col-span-8 xl:order-2 xl:col-span-7'>
            <header className='space-y-3'>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
                The Story So Far
              </p>
              <h1
                id='about-story-heading'
                className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl'
              >
                From DIY musician to full-stack engineer.
              </h1>
            </header>

            <div className='text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl md:leading-relaxed'>
              {storyParagraphs.map((paragraph) => (
                <p className='mt-0 mb-2' key={paragraph.slice(0, 24)}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
