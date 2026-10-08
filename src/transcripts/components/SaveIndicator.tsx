import type { SaveIndicatorProps } from './SaveIndicatorProps'
import { saveLabels } from './saveLabels'

export function SaveIndicator({ state }: SaveIndicatorProps) {
  return (
    <span role="status" className="meta-text">
      {saveLabels[state]}
    </span>
  )
}
