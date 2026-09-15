import type { AskStage } from './AskStage.ts'
import type { RequestOptions } from './RequestOptions.ts'

export type StreamAskOptions = RequestOptions & {
  onStage: (stage: AskStage) => void
}
