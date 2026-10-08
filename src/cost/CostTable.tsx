import type { CostTableProps } from './CostTableProps'
import { CostTableRow } from './CostTableRow'

export function CostTable({ rows }: CostTableProps) {
  if (rows.length === 0)
    return (
      <p className="mt-10 text-muted-foreground">
        No transcripts yet, so there is nothing to measure.
      </p>
    )
  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full min-w-176 border-collapse text-left">
        <caption className="sr-only">Cleanup effort per transcript</caption>
        <thead className="eyebrow border-b border-border text-muted-foreground">
          <tr>
            <th scope="col" className="py-2 pr-4 font-normal">
              Transcript
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Audio
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              AI edits proposed
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Edits decided
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Reviewer time (estimated from decision timestamps)
            </th>
            <th scope="col" className="py-2 font-normal">
              Reviewer min per audio hour
            </th>
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
