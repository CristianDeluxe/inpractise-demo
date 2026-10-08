import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useInterviewsPage } from '@/workspace/hooks/useInterviewsPage'
import { InterviewFilters } from './InterviewFilters'
import { InterviewList } from './InterviewList'

export function InterviewsPage() {
  const page = useInterviewsPage()
  const { library } = page
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <p className="eyebrow text-muted-foreground">Research</p>
      <h1 className="mt-3 font-sans text-3xl">Expert interviews</h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm text-muted-foreground">
        Every interview below is one this account is authorized to read. Pick a
        company, ask a question, and follow each answer back to the quote it
        cites.
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
          <InterviewFilters
            library={library.state.data.data}
            company={page.company}
            onCompanyChange={page.setCompany}
            titleText={page.titleText}
            onTitleTextChange={page.setTitleText}
          />
          <InterviewList interviews={page.interviews} total={page.total} />
          <ResponseMeta {...library.state.data} />
        </>
      ) : null}
    </main>
  )
}
