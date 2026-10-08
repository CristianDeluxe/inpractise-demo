import type { TimeInterval } from '../review/TimeInterval'

export type LoopEditButtonProps = {
  readonly span: TimeInterval | undefined
  readonly looping: boolean
  readonly onToggle: () => void
}
