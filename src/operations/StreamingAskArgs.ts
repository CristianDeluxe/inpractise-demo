import type { AskRequest } from '@/api/AskRequest'
import type { AskStage } from '@/api/AskStage'

export type StreamingAskArgs = {
  request: AskRequest
  onStage: (stage: AskStage) => void
}
