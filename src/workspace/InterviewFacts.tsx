import type { InterviewCardProps } from './InterviewCardProps'
import { interviewProfiles } from './interviewProfiles'

export function InterviewFacts({ interview }: InterviewCardProps) {
  const profile = interviewProfiles[interview.document_id]
  return (
    <dl className="mb-5 mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm">
      {profile === undefined ? null : (
        <>
          <dt className="text-muted-foreground">Guest</dt>
          <dd>
            {profile.guest}, {profile.guestRole}
          </dd>
          <dt className="text-muted-foreground">Host</dt>
          <dd>{profile.host}</dd>
        </>
      )}
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
  )
}
