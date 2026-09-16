import type { RecentRequestRowProps } from './RecentRequestRowProps'

export type RecentRequestSummaryLineProps = RecentRequestRowProps & {
  isOpen: boolean
  onToggle: () => void
}
