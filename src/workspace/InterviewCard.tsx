import { formatCompanyName } from '@/components/formatters/formatCompanyName'
import { SourceLabel } from '@/components/SourceLabel'
import { Link } from '@tanstack/react-router'
import type { InterviewCardProps } from './InterviewCardProps'

/**
 * The list row carries no expert name or first excerpt id, so the card shows
 * only what it has and opens Ask scoped to the company rather than a reader
 * path it would have to invent.
 */
export function InterviewCard({ interview }: InterviewCardProps) {
  const name = formatCompanyName(interview.company)
  return (
    <article
      aria-label={interview.title}
      className="flex h-full flex-col rounded-lg border border-border bg-card p-5"
    >
      <SourceLabel origin={interview.origin} kind={interview.kind} />
      <p className="mt-4 text-xs uppercase tracking-widest text-primary">
        {name}
      </p>
      <h3 className="mt-2 font-sans text-lg leading-snug">{interview.title}</h3>
      <dl className="mb-5 mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm">
        {interview.interview_date === null ? null : (
          <>
            <dt className="text-muted-foreground">Interview date</dt>
            <dd>{interview.interview_date}</dd>
          </>
        )}
        {interview.passage_count === undefined ? null : (
          <>
            <dt className="text-muted-foreground">Excerpts</dt>
            <dd>{interview.passage_count}</dd>
          </>
        )}
      </dl>
      <div className="mt-auto border-t border-border pt-4">
        <Link
          to="/app/ask"
          search={{ company: interview.company }}
          aria-label={`Ask about ${name}: ${interview.title}`}
          className="action"
        >
          Ask about {name}
        </Link>
      </div>
    </article>
  )
}
