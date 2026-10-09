import { MeasuredQuality } from './MeasuredQuality'
import { ReliabilityExplainer } from './ReliabilityExplainer'
import { ReliabilityHeadline } from './ReliabilityHeadline'
import type { ReliabilityRailProps } from './ReliabilityRailProps'
import { ReportLinkButton } from './ReportLinkButton'
import { ReviewFacts } from './ReviewFacts'
import { ReviewLegend } from './ReviewLegend'

/** Reliability, its figures and the report: beside the text on wide screens, above it otherwise. */
export function ReliabilityRail({
  transcript,
  reliability,
  mode,
  onOpenReport,
  inspector,
}: ReliabilityRailProps) {
  return (
    <aside
      aria-label="Reliability"
      className="min-w-0 space-y-4 xl:sticky xl:top-4 xl:col-start-2 xl:row-start-1 xl:max-h-[calc(100dvh-2rem)] xl:self-start xl:overflow-y-auto"
    >
      {reliability === null ? null : (
        <ReliabilityHeadline summary={reliability} />
      )}
      <ReviewFacts transcript={transcript} reliability={reliability} />
      <MeasuredQuality transcriptId={transcript.id} />
      <ReliabilityExplainer />
      <ReviewLegend mode={mode} />
      <ReportLinkButton onOpenReport={onOpenReport} />
      {inspector}
    </aside>
  )
}
