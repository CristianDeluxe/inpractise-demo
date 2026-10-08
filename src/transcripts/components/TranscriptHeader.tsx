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
      <h1 className="mt-4 line-clamp-3 text-balance text-[1.5rem] leading-tight md:mt-6 md:line-clamp-none md:text-[2.35rem]">
        {source.title}
      </h1>
      <p className="mt-2 flex flex-wrap gap-x-2 text-sm md:mt-3 text-muted-foreground">
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
