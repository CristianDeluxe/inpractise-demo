import type { CompareStage } from '@/api/CompareStage'

export type CompareStageTrailProps = {
  stages: readonly CompareStage[]
  pending: boolean
}
