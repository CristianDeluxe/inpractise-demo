import type { BarChartLegendProps } from './BarChartLegendProps'
import { segmentToneClass } from './segmentToneClass'

export function BarChartLegend({ items }: BarChartLegendProps) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`inline-block size-3 ${segmentToneClass[item.tone]}`}
          />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
