import type { RailFooterProps } from './RailFooterProps'
import { ReportLinkButton } from './ReportLinkButton'
import { ReviewLegend } from './ReviewLegend'

/** How the text is marked, and the way out to the full report. */
export function RailFooter({ mode, onOpenReport }: RailFooterProps) {
  return (
    <div className="space-y-3 px-4 py-3">
      <ReviewLegend mode={mode} />
      <ReportLinkButton onOpenReport={onOpenReport} />
    </div>
  )
}
