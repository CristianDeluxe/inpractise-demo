import type { InvestigateRequest } from '@/api/InvestigateRequest'
import type { InvestigateStage } from '@/api/InvestigateStage'

export type StreamingInvestigateArgs = {
  request: InvestigateRequest
  onStage: (stage: InvestigateStage) => void
}
