'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SplitText } from '@/components/ui/split-text'
import { cn } from '@/lib/utils'

const HEADLINE = "Let's Build Something Great Together."
const BODY =
  'Whether you are looking to fill a flexible role, need an extra set of hands for a freelance project, or just want to talk about Next.js and modern web architecture, my inbox is always open.\n\nI\'m based in Rancho Cucamonga and am highly open to hybrid or on-site roles throughout the Inland Empire, Orange County, and Los Angeles. Drop me a message, and let\'s grab a coffee and chat!'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const DIRECT_LINKS = [
  {
    href: 'mailto:michael@a2zeta.com',
    label: 'Email',
    icon: Mail,
    text: 'michael@a2zeta.com',
  },
  {
    href: 'https://linkedin.com/in/codenamezeta',
    label: 'LinkedIn',
    icon: Linkedin,
    text: '@codenamezeta',
  },
  {
    href: 'https://github.com/codenamezeta',
    label: 'GitHub',
    icon: Github,
    text: '@codenamezeta',
  },
] as const

export function ContactIntro() {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: 'easeOut' as const }
  const stagger = reduceMotion ? 0 : 0.06
  const delayChildren = reduceMotion ? 0 : 0.1

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
    >
      <motion.div variants={fadeUp} transition={transition}>
        <SplitText
          text={HEADLINE}
          splitType="words"
          as="h1"
          id="contact-heading"
          className={cn(
            'text-3xl font-bold leading-tight tracking-tight text-foreground',
            'sm:text-4xl md:text-4xl lg:text-5xl'
          )}
          delay={reduceMotion ? 0 : 0.05}
          duration={0.4}
          staggerChildren={reduceMotion ? 0 : 0.03}
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
        />
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
        variants={fadeUp}
        transition={transition}
      >
        {BODY.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-3"
        variants={fadeUp}
        transition={transition}
      >
        {DIRECT_LINKS.map(({ href, label, icon: Icon, text }) => (
          <Button
            key={label}
            asChild
            variant="outline"
            size="lg"
            className="min-h-11 gap-2"
          >
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`${label}: ${text}`}
            >
              <Icon aria-hidden data-icon="inline-start" />
              <span className="hidden sm:inline">{text}</span>
              <span className="sm:hidden">{label}</span>
            </a>
          </Button>
        ))}
      </motion.div>
    </motion.div>
  )
}
