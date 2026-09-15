import { PublicLayout } from '@/components/PublicLayout'
import { BuildStrip } from './BuildStrip'
import { EvidenceExample } from './EvidenceExample'
import { LandingHero } from './LandingHero'

export function LandingPage() {
  return (
    <PublicLayout>
      <main id="main-content">
        <LandingHero />
        <BuildStrip />
        <EvidenceExample />
      </main>
    </PublicLayout>
  )
}
