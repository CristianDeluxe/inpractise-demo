import { RequestFeedback } from '@/components/RequestFeedback'
import { useInterviewLibrary } from '@/workspace/hooks/useInterviewLibrary'
import { InterviewList } from './InterviewList'
import { WorkspacePage } from './WorkspacePage'

export function InterviewsPage() {
  const library = useInterviewLibrary()
  return (
    <WorkspacePage
      eyebrow="Research"
      title="Interviews"
      intro="Two public podcast interviews with CEOs, transcribed automatically. Read a transcript, or ask a question and follow each answer back to the quote it cites."
    >
      <RequestFeedback
        state={library.state}
        cancel={library.cancel}
        retry={() => {
          void library.run(undefined)
        }}
      />
      {library.state.status === 'success' ? (
        <InterviewList interviews={library.state.data.data.items} />
      ) : null}
    </WorkspacePage>
  )
}
