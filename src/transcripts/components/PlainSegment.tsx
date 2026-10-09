import { Fragment } from 'react'
import type { PlainSegmentProps } from './PlainSegmentProps'
import { scoredWordClass } from './scoredWordClass'

/** Unedited text whose words replay the audio when clicked, as in the AI final. */
export function PlainSegment({
  text,
  offset,
  words,
  onSeek,
}: PlainSegmentProps) {
  let at = offset
  return text.split(/(\s+)/u).map((token) => {
    const start = at
    const word = words.get(start)
    at += token.length
    if (word === undefined || token.trim() === '')
      return <Fragment key={start}>{token}</Fragment>
    return (
      <button
        key={start}
        type="button"
        tabIndex={-1}
        onClick={() => {
          onSeek(word.start)
        }}
        className={scoredWordClass(1)}
      >
        {token}
      </button>
    )
  })
}
