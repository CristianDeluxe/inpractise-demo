import type { HeaderFigureProps } from './HeaderFigureProps'

export function HeaderFigure({
  label,
  value,
  detail,
  emphasis = false,
  duration,
}: HeaderFigureProps) {
  return (
    <div className="min-w-0 px-5 py-4">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd
        className={`mt-2 font-serif text-[1.65rem] font-semibold leading-none tabular-nums ${emphasis ? 'text-primary' : ''}`}
      >
        {duration ? <time dateTime={duration}>{value}</time> : value}
      </dd>
      <dd className="mt-2 text-xs leading-snug text-muted-foreground">
        {detail}
      </dd>
    </div>
  )
}
