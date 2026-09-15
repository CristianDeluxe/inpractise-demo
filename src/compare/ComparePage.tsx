import { CompanyFilter } from '@/workspace/CompanyFilter'
import { useResearchWorkspace } from '@/workspace/hooks/useResearchWorkspace'
import { CompareSession } from './CompareSession'

export function ComparePage() {
  const { library, company, setCompany } = useResearchWorkspace()
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <p className="eyebrow text-muted-foreground">Cross-reference</p>
      <h1 className="mt-3 font-sans text-3xl">
        What executives say vs what the filing says
      </h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm text-muted-foreground">
        Retrieves interview and filing passages for one company separately, then
        asks for a grounded verdict on how the two sides relate. Every claim
        below cites the exact passage it read.
      </p>
      {library.state.status === 'success' ? (
        <CompanyFilter
          library={library.state.data.data}
          company={company}
          onChange={setCompany}
        />
      ) : null}
      <CompareSession key={company} company={company} />
    </main>
  )
}
