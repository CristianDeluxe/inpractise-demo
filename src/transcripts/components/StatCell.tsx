import type { StatCellProps } from './StatCellProps'

export function StatCell({ label, value, detail }: StatCellProps) {
  return (
    <div className="border-b border-r border-border bg-card p-4 print:border-black">
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-serif text-2xl font-semibold">{value}</dd>
      {detail ? <dd className="meta-text mt-1">{detail}</dd> : null}
    </div>
  )
}
