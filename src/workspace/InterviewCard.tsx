import { formatCompanyName } from '@/components/formatters/formatCompanyName'
import { SourceLabel } from '@/components/SourceLabel'
import { transcriptIdForDocument } from '@/transcripts/episodes/transcriptIdForDocument'
import { Link } from '@tanstack/react-router'
import type { InterviewCardProps } from './InterviewCardProps'
import { InterviewFacts } from './InterviewFacts'
import { interviewProfiles } from './interviewProfiles'

/**
 * The list row carries no speaker names or excerpt ids, so the guest, the
 * host and the first excerpt come from the typed profile for the document.
 * A document without a profile still opens Ask, and shows no reader link
 * rather than one built from a guessed identifier.
 */
export function InterviewCard({ interview }: InterviewCardProps) {
  const name = formatCompanyName(interview.company)
  const profile = interviewProfiles[interview.document_id]
  const transcriptId = transcriptIdForDocument(interview.document_id)
  return (
    <article
      aria-label={interview.title}
      id={interview.document_id}
      className="flex h-full scroll-mt-6 flex-col rounded-lg border border-border bg-card p-5"
    >
      <SourceLabel origin={interview.origin} kind={interview.kind} />
      <p className="mt-4 text-xs font-medium text-primary">{name}</p>
      <h3 className="mt-2 text-base">{interview.title}</h3>
      <InterviewFacts interview={interview} />
      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4">
        {profile === undefined ? null : (
          <Link
            to={`/read/${interview.document_id}/${interview.revision_id}/${profile.firstPassageId}`}
            aria-label={`Read the transcript: ${interview.title}`}
            className="action"
          >
            Read the transcript
          </Link>
        )}
        <Link
          to="/app/ask"
          search={{ company: interview.company }}
          aria-label={`Ask about ${name}: ${interview.title}`}
          className="quiet-action"
        >
          Ask about {name}
        </Link>
        {transcriptId === undefined ? null : (
          <Link
            to="/app/transcripts/$id"
            params={{ id: transcriptId }}
            aria-label={`Transcript quality: ${interview.title}`}
            className="quiet-action"
          >
            Transcript quality
          </Link>
        )}
      </div>
    </article>
  )
}
