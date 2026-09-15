import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import { SourceLabel } from '@/components/SourceLabel'
import { citationAttribution } from '@/research/citationAttribution'
import type { CitationCardProps } from '@/research/CitationCardProps'

/** The passage as the server re-read it for this listing, origin first. */
export function NoteEvidence({ citation }: CitationCardProps) {
  return (
    <>
      <SourceLabel origin={citation.origin} />
      <blockquote className="source-text my-3 whitespace-pre-wrap break-words border-l-2 border-primary pl-4">
        {citation.quote}
      </blockquote>
      <p className="text-xs text-muted-foreground">
        {citationAttribution(citation)} ·{' '}
        {citation.interviewDate
          ? `Interview: ${citation.interviewDate}`
          : `Published: ${formatPublishedDate(citation.publishedAt)}`}
      </p>
    </>
  )
}
