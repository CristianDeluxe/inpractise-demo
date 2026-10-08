import type { SourceLabelProps } from './SourceLabelProps'

export function SourceLabel({ origin, kind }: SourceLabelProps) {
  const label =
    kind === 'public_interview'
      ? 'Public podcast - automatic transcript'
      : origin === 'synthetic'
        ? 'Synthetic interview — fictional company and speaker'
        : 'Public filing'
  return <p className="text-xs font-medium text-muted-foreground">{label}</p>
}
