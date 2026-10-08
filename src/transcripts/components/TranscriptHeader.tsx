import { formatDuration } from '../formatters/formatDuration'
import { transcriptDisclosure } from '../review/transcriptDisclosure'
import { DisclosureNotice } from './DisclosureNotice'
import { ReviewFigures } from './ReviewFigures'
import type { TranscriptHeaderProps } from './TranscriptHeaderProps'

export function TranscriptHeader({
  transcript,
  correction,
  nav,
}: TranscriptHeaderProps) {
  const { source } = transcript
  return (
    <header>
      {nav}
      <h1 className="mt-6 text-balance text-[1.75rem] leading-tight md:text-[2.35rem]">
        {source.title}
      </h1>
      <p className="mt-3 flex flex-wrap gap-x-2 text-sm text-muted-foreground">
        <span>{source.channel}</span>
        <span aria-hidden="true">·</span>
        <span>{source.uploadDate}</span>
        <span aria-hidden="true">·</span>
        <span>{formatDuration(source.durationSeconds)}</span>
        <span aria-hidden="true">·</span>
        <a
          href={source.url}
          className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-foreground md:min-h-0"
          rel="noreferrer noopener"
        >
          Source video
        </a>
      </p>
      <DisclosureNotice
        text={transcriptDisclosure(correction?.model ?? null)}
      />
      <ReviewFigures transcript={transcript} correction={correction} />
    </header>
  )
}
