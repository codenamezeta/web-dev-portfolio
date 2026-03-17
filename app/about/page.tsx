import { AboutStoryHero } from '@/components/sections/about-story-hero'
import { AboutJourneyTimeline } from '@/components/sections/about-journey-timeline'
import { OutOfOfficeSection } from '@/components/sections/out-of-office-section'
import { CTASection } from '@/components/sections/cta-section'

export default function AboutPage() {
  return (
    <main className='bg-background'>
      <AboutStoryHero />
      <AboutJourneyTimeline />
      <OutOfOfficeSection />
      <CTASection />
    </main>
  )
}
