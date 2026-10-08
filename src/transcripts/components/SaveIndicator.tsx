import type { SaveIndicatorProps } from './SaveIndicatorProps'
import { saveLabels } from './saveLabels'

export function SaveIndicator({ state }: SaveIndicatorProps) {
  return (
    <span
      role="status"
      className="whitespace-nowrap font-mono text-xs text-muted-foreground"
    >
      {saveLabels[state]}
    </span>
  )
}
