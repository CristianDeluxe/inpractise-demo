import { CompanyFilter } from '@/workspace/CompanyFilter'
import { useResearchWorkspace } from '@/workspace/hooks/useResearchWorkspace'
import { Link } from '@tanstack/react-router'
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
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Each question on this page starts its own retrieval and shows every
        stage of it. For follow-ups, use the Ask IP chat: it rewrites each one
        into a standalone question and shows you that question.
      </p>
      <Link
        to="/app/compare"
        search={company ? { company } : {}}
        className="mb-8 mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
      >
        Compare with the filing →
      </Link>
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
