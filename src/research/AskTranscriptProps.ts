import type { AskStage } from '@/api/AskStage'
import type { AskExchange } from './AskExchange'

export type AskTranscriptProps = {
  exchanges: AskExchange[]
  pending: boolean
  stages: AskStage[]
}
