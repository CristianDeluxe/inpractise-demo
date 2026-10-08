import { BarChartLegend } from './BarChartLegend'
import type { BarChartProps } from './BarChartProps'
import { chartMaximum } from './chartMaximum'
import { segmentToneClass } from './segmentToneClass'
import { segmentWidth } from './segmentWidth'

/**
 * Horizontal bars in plain markup: the numbers are visible text beside each
 * bar, so the chart needs no separate description, scales to any width and has
 * nothing to animate.
 */
export function BarChart({ caption, rows, legend }: BarChartProps) {
  const maximum = chartMaximum(rows)
  return (
    <figure className="mt-6 min-w-0">
      <figcaption className="text-sm font-medium">{caption}</figcaption>
      {legend === undefined ? null : <BarChartLegend items={legend} />}
      <ul className="mt-4 space-y-5">
        {rows.map((row) => (
          <li key={row.key}>
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
              <span className="min-w-0 break-words">{row.label}</span>
              <span className="font-mono tabular-nums">{row.text}</span>
            </div>
            <div aria-hidden="true" className="mt-2 flex h-5 bg-secondary">
              {row.segments.map((segment) => (
                <div
                  key={segment.tone}
                  className={`h-full ${segmentToneClass[segment.tone]}`}
                  style={{ width: segmentWidth(segment.value, maximum) }}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </figure>
  )
}
