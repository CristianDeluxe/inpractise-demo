import type { CostRowsProps } from './CostRowsProps'
import { costTableHeadings } from './costTableHeadings'
import { CostTableRow } from './CostTableRow'

export function CostTable({ rows }: CostRowsProps) {
  if (rows.length === 0)
    return (
      <p className="mt-10 text-muted-foreground">
        No transcripts yet, so there is nothing to measure.
      </p>
    )
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-240 border-collapse text-left">
        <caption className="sr-only">Cleanup cost per transcript</caption>
        <thead className="eyebrow border-b border-border text-muted-foreground">
          <tr>
            {costTableHeadings.map((heading) => (
              <th key={heading} scope="col" className="py-2 pr-4 font-normal">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <CostTableRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
