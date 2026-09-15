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
        Each question starts its own retrieval. Nothing carries over from the
        previous one, so an answer depends on the corpus rather than on what you
        asked before.
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
