import { CompanyFilter } from '@/workspace/CompanyFilter'
import { useResearchWorkspace } from '@/workspace/hooks/useResearchWorkspace'
import { AskSession } from './AskSession'

export function AskPage() {
  const { library, company, setCompany } = useResearchWorkspace()
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <p className="eyebrow text-muted-foreground">Ask the corpus</p>
      <h1 className="mt-3 font-sans text-3xl">Ask. Read. Verify.</h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm text-muted-foreground">
        Each question on this page starts its own retrieval and shows every
        stage of it. For follow-ups, use the Ask IP chat: it rewrites each one
        into a standalone question and shows you that question.
      </p>
      {library.state.status === 'success' ? (
        <CompanyFilter
          library={library.state.data.data}
          company={company}
          onChange={setCompany}
        />
      ) : null}
      <AskSession key={company} company={company} />
    </main>
  )
}
