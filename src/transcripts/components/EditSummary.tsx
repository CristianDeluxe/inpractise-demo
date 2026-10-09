import { Badge } from './Badge'
import { ConfidenceMeter } from './ConfidenceMeter'
import type { EditSummaryProps } from './EditSummaryProps'
import { originLabel } from './originLabel'
import { TrackedOps } from './TrackedOps'

/** Category, origin, confidence, the change itself and the corrector's reason. */
export function EditSummary({ edit }: EditSummaryProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="neutral">{edit.category}</Badge>
        <Badge tone={edit.origin === 'memory' ? 'accent' : 'neutral'}>
          {originLabel[edit.origin]}
        </Badge>
        <span className="ml-auto">
          <ConfidenceMeter value={edit.confidence} />
        </span>
      </div>
      <p className="font-serif text-[17px] leading-relaxed">
        <TrackedOps from={edit.from} to={edit.to} />
      </p>
      <p className="text-sm text-muted-foreground">{edit.reason}</p>
    </div>
  )
}
