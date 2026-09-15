import { compareSideLabel } from './compareSideLabel'
import { compareUncoveredExplanation } from './compareUncoveredExplanation'
import type { CompareUncoveredNoticeProps } from './CompareUncoveredNoticeProps'

export function CompareUncoveredNotice({ side }: CompareUncoveredNoticeProps) {
  return (
    <div
      role="status"
      className="border border-warning/40 bg-warning/10 p-4 text-sm"
    >
      No {compareSideLabel(side).toLowerCase()} evidence for this company.{' '}
      {compareUncoveredExplanation(side)}
    </div>
  )
}
