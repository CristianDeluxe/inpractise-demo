import { CorrectionsSection } from './CorrectionsSection'
import { MeasuredQuality } from './MeasuredQuality'
import { QualitySection } from './QualitySection'
import { RailFooter } from './RailFooter'
import { RailSummary } from './RailSummary'
import type { ReliabilityRailProps } from './ReliabilityRailProps'

/** Reliability, its figures and the report: beside the text on wide screens, a collapsible card above it otherwise. */
export function ReliabilityRail({
  transcript,
  reliability,
  mode,
  wide,
  onOpenReport,
  inspector,
}: ReliabilityRailProps) {
  return (
    <aside
      aria-label="Reliability"
      className="min-w-0 space-y-4 xl:sticky xl:top-4 xl:col-start-2 xl:row-start-1 xl:max-h-[calc(100dvh-2rem)] xl:self-start xl:overflow-y-auto"
    >
      <details
        open={wide}
        className="rounded-lg border border-border bg-card text-sm"
      >
        <RailSummary reliability={reliability} />
        <div className="divide-y divide-border border-t border-border xl:border-t-0">
          <QualitySection transcript={transcript} reliability={reliability} />
          <CorrectionsSection
            transcript={transcript}
            reliability={reliability}
          />
          <MeasuredQuality transcriptId={transcript.id} />
          <RailFooter mode={mode} onOpenReport={onOpenReport} />
        </div>
      </details>
      {inspector}
    </aside>
  )
}
