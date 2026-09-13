import { PublicLayout } from '@/components/PublicLayout'
import { CorpusTicker } from './CorpusTicker'
import { DeskInterlude } from './DeskInterlude'
import { EvidenceExample } from './EvidenceExample'
import { LandingHero } from './LandingHero'
import { ResearchPillars } from './ResearchPillars'

export function LandingPage() {
  return (
    <PublicLayout>
      <main id="main-content">
        <LandingHero />
        <CorpusTicker />
        <ResearchPillars />
        <DeskInterlude />
        <EvidenceExample />
      </main>
    </PublicLayout>
  )
}
