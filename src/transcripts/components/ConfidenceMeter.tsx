import type { ConfidenceMeterProps } from './ConfidenceMeterProps'

/** The corrector's own confidence in an edit, as a short bar and a percentage. */
export function ConfidenceMeter({ value }: ConfidenceMeterProps) {
  const percent = Math.round(value * 100)
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] tabular-nums text-muted-foreground">
      <span
        aria-hidden="true"
        className="h-1 w-10 overflow-hidden rounded-full bg-secondary"
      >
        <span
          className="block h-full rounded-full bg-primary"
          style={{ width: `${String(percent)}%` }}
        />
      </span>
      {percent}% sure
    </span>
  )
}
