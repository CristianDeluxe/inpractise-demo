import type { CompareRequest } from '@/api/CompareRequest'
import type { CompareStage } from '@/api/CompareStage'

export type StreamingCompareArgs = {
  request: CompareRequest
  onStage: (stage: CompareStage) => void
}
