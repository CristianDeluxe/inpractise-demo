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
      <p className="eyebrow text-muted-foreground">Research</p>
      <h1 className="mt-3 font-sans text-3xl">Ask the interviews</h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm text-muted-foreground">
        Answers are built only from quoted interview excerpts. If no quote
        supports an answer, you get no answer.
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
