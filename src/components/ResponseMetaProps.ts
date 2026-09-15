import type { AskStage } from '@/api/AskStage'

export type ResponseMetaProps = {
  buildId: string
  requestId: string
  stages?: readonly AskStage[]
}
