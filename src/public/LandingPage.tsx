import { PublicLayout } from '@/components/PublicLayout'
import { EvidenceExample } from './EvidenceExample'
import { LandingHero } from './LandingHero'
import { WorkflowStrip } from './WorkflowStrip'

export function LandingPage() {
  return (
    <PublicLayout>
      <main id="main-content">
        <LandingHero />
        <WorkflowStrip />
        <EvidenceExample />
      </main>
    </PublicLayout>
  )
}
