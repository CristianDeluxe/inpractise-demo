import { Badge } from './Badge'
import type { EditCardProps } from './EditCardProps'
import { VerdictButtons } from './VerdictButtons'

export function EditCard({ edit, controls }: EditCardProps) {
  const verdict = controls.decisions.get(edit.id)
  const focused = controls.focusedEditId === edit.id
  return (
    <li
      aria-current={focused ? 'true' : undefined}
      onFocusCapture={() => {
        controls.focusEdit(edit.id)
      }}
      className={`flex flex-col gap-3 border bg-card p-3 text-sm ${focused ? 'border-primary ring-2 ring-primary/30' : 'border-border'}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono">
          <del className="text-destructive">{edit.from}</del>
          <span aria-label="becomes"> {'→'} </span>
          <strong className="text-success-foreground">{edit.to}</strong>
        </span>
        <Badge tone="neutral">{edit.category}</Badge>
        {edit.origin === 'memory' ? (
          <Badge tone="accent">learned</Badge>
        ) : (
          <Badge tone="neutral">model</Badge>
        )}
        <span className="meta-text">
          {String(Math.round(edit.confidence * 100))}%
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground">{edit.reason}</p>
        <VerdictButtons
          verdict={verdict}
          onDecide={(next) => {
            controls.decide([edit.id], next)
          }}
        />
      </div>
    </li>
  )
}
