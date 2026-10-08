import { Fragment } from 'react'
import { formatTimestamp } from '../formatters/formatTimestamp'
import type { ReportBodyProps } from './ReportBodyProps'
import { reportWordClass } from './reportWordClass'
import { scoredWordTitle } from './scoredWordTitle'

export function ReportBody({ paragraphs }: ReportBodyProps) {
  return (
    <section aria-label="AI-final transcript" className="mt-8 space-y-6">
      {paragraphs.map((paragraph) => (
        <div
          key={paragraph.id}
          className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 md:grid-cols-[4.5rem_minmax(0,68ch)] md:gap-6"
        >
          <time className="meta-text pt-1.5 text-right print:text-black">
            {formatTimestamp(paragraph.start)}
          </time>
          <p className="source-text">
            {paragraph.words.map((word, index) => (
              <Fragment key={`${String(index)}-${word.text}`}>
                {index === 0 ? '' : ' '}
                <span
                  title={scoredWordTitle(word.score)}
                  className={reportWordClass(word.score)}
                >
                  {word.text}
                </span>
              </Fragment>
            ))}
          </p>
        </div>
      ))}
    </section>
  )
}
