'use client'

import { SplitText } from '@/components/ui/split-text'

export function PortfolioPageHeader() {
  return (
    <header className='mb-12'>
      <SplitText
        text='Portfolio'
        splitType='words'
        as='h1'
        className='text-3xl font-bold text-foreground sm:text-4xl'
        delay={0.1}
        duration={0.4}
        staggerChildren={0.05}
      />
      <p className='mt-2 text-muted-foreground'>
        Web design and development projects with case studies and code samples.
      </p>
    </header>
  )
}
