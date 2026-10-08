import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useInterviewLibrary } from '@/workspace/hooks/useInterviewLibrary'
import { InterviewList } from './InterviewList'

export function InterviewsPage() {
  const library = useInterviewLibrary()
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <p className="eyebrow text-muted-foreground">Research</p>
      <h1 className="mt-3 font-sans text-3xl">Interviews</h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm text-muted-foreground">
        Two public podcast interviews with CEOs, transcribed automatically. Read
        a transcript, or ask a question and follow each answer back to the quote
        it cites.
      </p>
      <RequestFeedback
        state={library.state}
        cancel={library.cancel}
        retry={() => {
          void library.run(undefined)
        }}
      />
      {library.state.status === 'success' ? (
        <>
          <InterviewList interviews={library.state.data.data.items} />
          <ResponseMeta {...library.state.data} />
        </>
      ) : null}
    </main>
  )
}
