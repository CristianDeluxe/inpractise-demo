import type { TimeInterval } from '../review/TimeInterval'

export type ReplayEditButtonProps = {
  readonly span: TimeInterval | undefined
  readonly onReplay: () => void
}
