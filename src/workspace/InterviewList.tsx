import { InterviewCard } from './InterviewCard'
import type { InterviewListProps } from './InterviewListProps'

export function InterviewList({ interviews, total }: InterviewListProps) {
  if (interviews.length === 0)
    return (
      <p className="text-sm text-muted-foreground">
        {total === 0
          ? 'No interview is available to this account.'
          : 'No interview matches these filters.'}
      </p>
    )
  return (
    <section aria-label="Interviews">
      <p className="mb-4 text-sm text-muted-foreground">
        {String(interviews.length)} of {String(total)} interviews
      </p>
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {interviews.map((interview) => (
          <li key={interview.document_id} className="min-w-0">
            <InterviewCard interview={interview} />
          </li>
        ))}
      </ul>
    </section>
  )
}
