import type { SourceLabelProps } from './SourceLabelProps'

export function SourceLabel({ origin }: SourceLabelProps) {
  return (
    <p className="text-xs font-medium text-muted-foreground">
      {origin === 'synthetic'
        ? 'Synthetic interview — fictional company and speaker'
        : 'Public filing'}
    </p>
  )
}
