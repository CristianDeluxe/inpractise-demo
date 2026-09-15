import type { AskStage } from '@/api/AskStage'
import type { Answer } from '@/contracts/Answer'

export type EvidenceInspectorProps = {
  answer: Answer | undefined
  stages: readonly AskStage[]
  pending: boolean
}
