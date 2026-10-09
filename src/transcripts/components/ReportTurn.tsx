import { Fragment } from 'react'
import { formatTimestamp } from '../formatters/formatTimestamp'
import { speakerTextClass } from '../speakers/speakerTextClass'
import type { ReportTurnProps } from './ReportTurnProps'
import { reportWordClass } from './reportWordClass'
import { scoredWordTitle } from './scoredWordTitle'

/** One speaker turn of the report: timestamp and speaker on the left, the words on the right. */
export function ReportTurn({ start, role, name, words }: ReportTurnProps) {
  return (
    <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-6">
      <div className="pt-1.5 text-right">
        <time className="meta-text block print:text-black">
          {formatTimestamp(start)}
        </time>
        {name === null ? null : (
          <span
            className={`block text-xs font-medium leading-snug ${speakerTextClass(role)}`}
          >
            {name}
          </span>
        )}
      </div>
      <p className="source-text">
        {words.map((word, index) => (
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
  )
}
