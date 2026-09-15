import type { StatTileProps } from './StatTileProps'

/**
 * An undefined value renders as "unknown", never as zero or a dash that reads
 * like one: the difference between "no documents" and "not measured" is the
 * kind of distinction this workspace exists to keep.
 */
export function StatTile({ label, value, note }: StatTileProps) {
  return (
    <div className="rounded border border-border bg-card p-4">
      <p className="eyebrow text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-2xl">
        {value === undefined ? (
          <span className="text-base text-muted-foreground">unknown</span>
        ) : (
          value
        )}
      </p>
      {note === undefined ? null : (
        <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      )}
    </div>
  )
}
