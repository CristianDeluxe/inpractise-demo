import type { InvestigateStage } from '@/api/InvestigateStage'

export type InvestigationTrailProps = {
  stages: InvestigateStage[]
  pending: boolean
}
