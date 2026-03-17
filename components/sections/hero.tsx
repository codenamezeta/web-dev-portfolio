'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SplitText } from '@/components/ui/split-text'
import { cn } from '@/lib/utils'

const HERO_EYEBROW = 'Michael Zeta | Full-Stack Web Developer'
const HERO_HEADING =
  'Engineering Seamless Digital Experiences from Front to Back'
const HERO_BODY =
  'I bring a unique blend of technical precision and cross-team communication to every project. Whether architecting backend logic or refining UI/UX details, I focus on writing maintainable code and building collaborative solutions that drive results.'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: 'easeOut' as const }

  const stagger = reduceMotion ? 0 : 0.08
  const delayChildren = reduceMotion ? 0 : 0.15

  return (
    <section
      className='relative min-h-[85vh] overflow-hidden md:min-h-[90vh]'
      aria-labelledby='hero-heading'
    >
      {/* Background image with overlay for text contrast (works in light/dark) */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/imgs/code-background.jpg'
          alt='A laptop computer with code on the screen'
          fill
          priority
          sizes='100vw'
          className='object-cover invert dark:invert-0'
        />
        <div
          className='absolute inset-0 bg-linear-to-r from-background/50 to-transparent backdrop-blur-[2px]'
          aria-hidden
        />
      </div>

      <div className='relative z-10 mx-auto grid min-h-[85vh] container grid-cols-1 items-center gap-8 px-4 py-16 md:min-h-[90vh] md:grid-cols-2 md:gap-12 md:px-6 lg:px-8'>
        {/* Left: copy */}
        <motion.div
          className='flex flex-col gap-6 text-center md:text-left'
          initial='hidden'
          animate='visible'
          variants={{
            visible: {
              transition: {
                staggerChildren: stagger,
                delayChildren: delayChildren,
              },
            },
          }}
        >
          <motion.p
            className='text-sm font-medium uppercase tracking-wider text-muted-foreground'
            variants={fadeUp}
            transition={transition}
          >
            {HERO_EYEBROW}
          </motion.p>
          <motion.div variants={fadeUp} transition={transition}>
            <SplitText
              text={HERO_HEADING}
              splitType='words'
              as='h1'
              id='hero-heading'
              className='text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-4xl lg:text-5xl'
              delay={reduceMotion ? 0 : 0.1}
              duration={0.4}
              staggerChildren={reduceMotion ? 0 : 0.03}
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
            />
          </motion.div>
          <motion.p
            className='max-w-xl text-base leading-relaxed light:text-foreground dark:text-muted-foreground sm:text-lg'
            variants={fadeUp}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.35 }}
          >
            {HERO_BODY}
          </motion.p>
          <motion.div
            className='flex flex-wrap justify-center gap-3 md:justify-start'
            variants={fadeUp}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.5 }}
          >
            <Button asChild size='lg' className='min-h-11 min-w-28'>
              <Link href='/portfolio'>Portfolio</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='min-h-11 min-w-28'
            >
              <Link href='/contact'>Contact Me</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right on md+: foreground image; on mobile stacks below copy */}
        <motion.div
          className={cn(
            'relative h-[min(50vh,24rem)] w-full max-w-xs md:h-[50vh] md:max-w-4xl md:justify-self-end',
            'mx-auto md:mx-0',
          )}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.35 }}
        >
          <Image
            src='/imgs/selfie-popout.png'
            alt='A photo of Michael Zeta'
            fill
            priority
            sizes='(max-width: 900px) 20rem, (min-width: 768px) 28rem, 100vw'
            className='object-contain object-center md:object-right'
          />
        </motion.div>
      </div>
    </section>
  )
}
