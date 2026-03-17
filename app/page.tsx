import { BenefitsSection } from '@/components/sections/benefits-section'
import { FAQSection } from '@/components/sections/faq-section'
import { Hero } from '@/components/sections/hero'
import { CTASection } from '@/components/sections/cta-section'
import { OutOfOfficeSection } from '@/components/sections/out-of-office-section'
import { PASSection } from '@/components/sections/pas-section'
import { PortfolioOverview } from '@/components/sections/portfolio-overview'
import { SkillsSection } from '@/components/sections/skills-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'

export default function Home() {
  return (
    <main className='bg-background'>
      <Hero />
      <PortfolioOverview />
      <PASSection />
      <BenefitsSection />
      <SkillsSection />
      <TestimonialsSection />
      <FAQSection />
      {/* <OutOfOfficeSection /> */}
      <CTASection />
    </main>
  )
}
