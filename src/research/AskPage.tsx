import { CompanyFilter } from '@/workspace/CompanyFilter'
import { useResearchWorkspace } from '@/workspace/hooks/useResearchWorkspace'
import { WorkspacePage } from '@/workspace/WorkspacePage'
import { AskSession } from './AskSession'

export function AskPage() {
  const { library, company, setCompany } = useResearchWorkspace()
  return (
    <WorkspacePage
      eyebrow="Research"
      title="Ask the interviews"
      intro="Answers are built only from quoted interview excerpts. If no quote supports an answer, you get no answer."
    >
      {library.state.status === 'success' ? (
        <CompanyFilter
          library={library.state.data.data}
          company={company}
          onChange={setCompany}
        />
      ) : null}
      <AskSession key={company} company={company} />
    </WorkspacePage>
  )
}
