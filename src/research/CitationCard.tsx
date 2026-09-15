import { formatCompanyName } from '@/components/formatters/formatCompanyName'
import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import { SourceLabel } from '@/components/SourceLabel'
import { SaveNoteButton } from '@/notebook/SaveNoteButton'
import { Link } from '@tanstack/react-router'
import type { CitationCardProps } from './CitationCardProps'
import { SourcePanel } from './SourcePanel'

export function CitationCard({ citation, question }: CitationCardProps) {
  return (
    <article className="mt-4 rounded-lg border border-border bg-card p-5">
      <SourceLabel origin={citation.origin} />
      <h3 className="mt-3 font-sans text-base">{citation.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {formatCompanyName(citation.company)} · {citation.speaker}{' '}
        {citation.speakerRole}
      </p>
      <blockquote className="source-text my-4 whitespace-pre-wrap break-words border-l-2 border-primary pl-4">
        {citation.quote}
      </blockquote>
      <p className="text-xs text-muted-foreground">
        {citation.interviewDate
          ? `Interview: ${citation.interviewDate} · `
          : null}
        Published: {formatPublishedDate(citation.publishedAt)}
      </p>
      <div className="mt-4 flex flex-wrap gap-5 text-sm">
        <SourcePanel citation={citation} />
        <Link
          to={citation.readerPath}
          className="text-primary underline"
          aria-label={`Open exact passage ${citation.citationId}`}
        >
          Open exact passage
        </Link>
      </div>
      <SaveNoteButton citation={citation} question={question} />
    </article>
  )
}
