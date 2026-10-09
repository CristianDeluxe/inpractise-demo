import { formatDuration } from '../formatters/formatDuration'
import type { TranscriptMetaProps } from './TranscriptMetaProps'

/** Publisher, date and length of the episode, with the link to the source video. */
export function TranscriptMeta({ source }: TranscriptMetaProps) {
  return (
    <p className="mt-3 flex flex-wrap gap-x-2 text-sm text-muted-foreground">
      <span>{source.channel}</span>
      <span aria-hidden="true">·</span>
      <span>{source.uploadDate}</span>
      <span aria-hidden="true">·</span>
      <span>{formatDuration(source.durationSeconds)}</span>
      <span aria-hidden="true">·</span>
      <a
        href={source.url}
        className="underline underline-offset-4 hover:text-foreground"
        rel="noreferrer noopener"
      >
        Source video
      </a>
    </p>
  )
}
