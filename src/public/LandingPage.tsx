import { PublicLayout } from '@/components/PublicLayout'
import { CorpusTicker } from './CorpusTicker'
import { DeskInterlude } from './DeskInterlude'
import { EvidenceExample } from './EvidenceExample'
import { ExecutivesSection } from './ExecutivesSection'
import { InterviewLibrary } from './InterviewLibrary'
import { LandingHero } from './LandingHero'
import { PodcastSection } from './PodcastSection'
import { ResearchPillars } from './ResearchPillars'

export function LandingPage() {
  return (
    <PublicLayout>
      <main id="main-content">
        <LandingHero />
        <CorpusTicker />
        <ResearchPillars />
        <InterviewLibrary />
        <DeskInterlude />
        <EvidenceExample />
        <PodcastSection />
        <ExecutivesSection />
      </main>
    </PublicLayout>
  )
}
