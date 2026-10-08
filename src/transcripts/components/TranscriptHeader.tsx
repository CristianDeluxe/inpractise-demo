import { formatDuration } from '../formatters/formatDuration'
import { transcriptDisclosure } from '../review/transcriptDisclosure'
import { ConfidenceLegend } from './ConfidenceLegend'
import { DisclosureNotice } from './DisclosureNotice'
import type { TranscriptHeaderProps } from './TranscriptHeaderProps'
import { TranscriptStatsGrid } from './TranscriptStatsGrid'

export function TranscriptHeader({
  transcript,
  correction,
}: TranscriptHeaderProps) {
  const { source } = transcript
  return (
    <header>
      <p className="eyebrow text-muted-foreground">Transcript review</p>
      <h1 className="mt-3 text-2xl md:text-3xl">{source.title}</h1>
      <p className="meta-text mt-3">
        {source.channel} / {source.uploadDate} /{' '}
        {formatDuration(source.durationSeconds)} /{' '}
        <a href={source.url} className="underline" rel="noreferrer noopener">
          source video
        </a>
      </p>
      <DisclosureNotice
        text={transcriptDisclosure(correction?.model ?? null)}
      />
      <TranscriptStatsGrid transcript={transcript} correction={correction} />
      <ConfidenceLegend />
    </header>
  )
}
