import { formatTimestamp } from '../formatters/formatTimestamp'
import type { ReportBodyProps } from './ReportBodyProps'
import { reportSegmentClass } from './reportSegmentClass'
import { reportSegmentTitle } from './reportSegmentTitle'

export function ReportBody({ paragraphs }: ReportBodyProps) {
  return (
    <section aria-label="Corrected transcript" className="mt-8 space-y-6">
      {paragraphs.map((paragraph) => (
        <div
          key={paragraph.id}
          className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 md:grid-cols-[4.5rem_minmax(0,68ch)] md:gap-6"
        >
          <time className="meta-text pt-1.5 text-right print:text-black">
            {formatTimestamp(paragraph.start)}
          </time>
          <p className="source-text">
            {paragraph.segments.map((segment, index) => (
              <span
                key={`${String(index)}-${segment.text}`}
                title={reportSegmentTitle(segment)}
                className={reportSegmentClass(segment)}
              >
                {segment.text}
              </span>
            ))}
          </p>
        </div>
      ))}
    </section>
  )
}
