import { Badge } from './Badge'
import type { GlossaryTableProps } from './GlossaryTableProps'

export function GlossaryTable({ entries }: GlossaryTableProps) {
  if (entries.length === 0) {
    return (
      <p className="mt-6 text-muted-foreground">
        The glossary is empty. Accept a few corrections and it fills in.
      </p>
    )
  }
  const sorted = [...entries].sort((a, b) => b.occurrences - a.occurrences)
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-144 border-collapse text-left">
        <caption className="sr-only">Learned substitutions</caption>
        <thead className="border-b border-border">
          <tr>
            <th scope="col" className="py-2 pr-4 font-medium">
              Raw heard
            </th>
            <th scope="col" className="py-2 pr-4 font-medium">
              Corrected to
            </th>
            <th scope="col" className="py-2 pr-4 font-medium">
              Category
            </th>
            <th scope="col" className="py-2 pr-4 font-medium">
              Seen
            </th>
            <th scope="col" className="py-2 font-medium">
              Sources
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border font-mono text-sm">
          {sorted.map((entry) => (
            <tr key={`${entry.from}|${entry.to}`}>
              <td className="py-3 pr-4 text-destructive">{entry.from}</td>
              <td className="py-3 pr-4 font-semibold">{entry.to}</td>
              <td className="py-3 pr-4">
                <Badge tone="neutral">{entry.category}</Badge>
              </td>
              <td className="py-3 pr-4">{String(entry.occurrences)}</td>
              <td className="py-3">{entry.sources.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
