import { formatCompanyName } from '@/components/formatters/formatCompanyName'
import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import { CompanyCardActions } from './CompanyCardActions'
import type { CompanyCardProps } from './CompanyCardProps'
import { describeInterviewDates } from './describeInterviewDates'

export function CompanyCard({ summary }: CompanyCardProps) {
  const name = formatCompanyName(summary.company)
  const dates = describeInterviewDates(summary)
  return (
    <article
      aria-label={name}
      className="flex h-full flex-col rounded-lg border border-border bg-card p-5"
    >
      <h3 className="break-words font-sans text-lg leading-snug">{name}</h3>
      <dl className="mb-5 mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm">
        {summary.interviews > 0 ? (
          <>
            <dt className="text-muted-foreground">Synthetic interviews</dt>
            <dd>{summary.interviews}</dd>
          </>
        ) : null}
        {dates === undefined ? null : (
          <>
            <dt className="text-muted-foreground">Interview dates</dt>
            <dd>
              {dates.map((date, index) => (
                <span key={date} className="whitespace-nowrap">
                  {index > 0 ? ' to ' : ''}
                  {date}
                </span>
              ))}
            </dd>
          </>
        )}
        {summary.filings > 0 ? (
          <>
            <dt className="text-muted-foreground">SEC filings</dt>
            <dd>{summary.filings}</dd>
          </>
        ) : null}
        <dt className="text-muted-foreground">Latest publication</dt>
        <dd>{formatPublishedDate(summary.latestPublished)}</dd>
      </dl>
      <CompanyCardActions company={summary.company} />
    </article>
  )
}
