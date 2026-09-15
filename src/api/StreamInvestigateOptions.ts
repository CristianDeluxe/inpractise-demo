import type { InvestigateStage } from './InvestigateStage.ts'
import type { RequestOptions } from './RequestOptions.ts'

export type StreamInvestigateOptions = RequestOptions & {
  onStage: (stage: InvestigateStage) => void
}
