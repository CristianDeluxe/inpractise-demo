import type { RequestState } from '@/runtime/RequestState'

export type RequestFeedbackProps = {
  state: RequestState<unknown>
  cancel: () => void
  retry?: () => void
}
