import type { InvestigateStage } from '@/api/InvestigateStage'
import type { InvestigationAnswer } from '@/contracts/InvestigationAnswer'

export type InvestigationInspectorProps = {
  answer: InvestigationAnswer | undefined
  stages: InvestigateStage[]
  pending: boolean
}
