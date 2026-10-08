import { TranscriptRow } from './TranscriptRow'
import type { TranscriptTableProps } from './TranscriptTableProps'

export function TranscriptTable({ items }: TranscriptTableProps) {
  if (items.length === 0) {
    return (
      <p className="mt-10 text-muted-foreground">
        No transcripts yet. Run the transcription pipeline to add one.
      </p>
    )
  }
  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full min-w-176 border-collapse text-left">
        <caption className="sr-only">Transcripts available for review</caption>
        <thead className="eyebrow border-b border-border text-muted-foreground">
          <tr>
            <th scope="col" className="py-2 pr-4 font-normal">
              Episode
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Length
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Low
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Medium
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Second pass
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Reviewed
            </th>
            <th scope="col" className="py-2 font-normal">
              Report
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <TranscriptRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
