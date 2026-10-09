import type { ReviewFactProps } from './ReviewFactProps'

export function ReviewFact({ label, value }: ReviewFactProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-2.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium tabular-nums">{value}</dd>
    </div>
  )
}
