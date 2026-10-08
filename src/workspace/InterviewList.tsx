import { InterviewCard } from './InterviewCard'
import type { InterviewListProps } from './InterviewListProps'

export function InterviewList({ interviews }: InterviewListProps) {
  if (interviews.length === 0)
    return (
      <p className="text-sm text-muted-foreground">
        No interview is available to this account.
      </p>
    )
  return (
    <section aria-label="Interviews">
      <ul className="grid gap-4 md:grid-cols-2">
        {interviews.map((interview) => (
          <li key={interview.document_id} className="min-w-0">
            <InterviewCard interview={interview} />
          </li>
        ))}
      </ul>
    </section>
  )
}
