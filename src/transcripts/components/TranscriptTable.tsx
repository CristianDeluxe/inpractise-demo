import { TranscriptRow } from './TranscriptRow'
import type { TranscriptTableProps } from './TranscriptTableProps'
import { transcriptTableHeadings } from './transcriptTableHeadings'

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
        <caption className="sr-only">
          Transcripts and their AI-final reliability
        </caption>
        <thead className="eyebrow border-b border-border text-muted-foreground">
          <tr>
            {transcriptTableHeadings.map((heading) => (
              <th key={heading} scope="col" className="py-2 pr-4 font-normal">
                {heading}
              </th>
            ))}
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
