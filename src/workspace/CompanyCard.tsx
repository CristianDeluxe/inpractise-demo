import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import { CompanyCardActions } from './CompanyCardActions'
import type { CompanyCardProps } from './CompanyCardProps'
import { describeInterviews } from './describeInterviews'

export function CompanyCard({ summary }: CompanyCardProps) {
  const interviews = describeInterviews(summary)
  return (
    <article
      aria-label={summary.company}
      className="flex flex-col rounded-lg border border-border bg-card p-5"
    >
      <h3 className="break-words font-sans text-lg leading-snug">
        {summary.company}
      </h3>
      <dl className="mt-4 space-y-1 text-sm text-muted-foreground">
        {interviews === undefined ? null : (
          <div>
            <dt className="sr-only">Interviews</dt>
            <dd>{interviews}</dd>
          </div>
        )}
        {summary.filings > 0 ? (
          <div>
            <dt className="sr-only">Filings</dt>
            <dd>
              {summary.filings} SEC{' '}
              {summary.filings === 1 ? 'filing' : 'filings'}
            </dd>
          </div>
        ) : null}
        <div>
          <dt className="sr-only">Latest publication</dt>
          <dd>
            Latest publication {formatPublishedDate(summary.latestPublished)}
          </dd>
        </div>
      </dl>
      <CompanyCardActions company={summary.company} />
    </article>
  )
}
