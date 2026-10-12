import { GlossaryHead } from './GlossaryHead'
import { GlossaryRow } from './GlossaryRow'
import type { GlossaryTableProps } from './GlossaryTableProps'

export function GlossaryTable({ entries }: GlossaryTableProps) {
  if (entries.length === 0) {
    return (
      <p className="mt-6 text-muted-foreground">
        The glossary is empty. Accept a few corrections and it fills in.
      </p>
    )
  }
  const sorted = [...entries].sort(
    (a, b) =>
      b.occurrences - a.occurrences || a.category.localeCompare(b.category),
  )
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-176 border-collapse text-left">
        <caption className="sr-only">Learned substitutions</caption>
        <GlossaryHead />
        <tbody className="divide-y divide-border text-sm">
          {sorted.map((entry) => (
            <GlossaryRow key={`${entry.from}|${entry.to}`} entry={entry} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
