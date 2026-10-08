import { EngineeringNavSection } from './EngineeringNavSection'
import { ProductionNavSection } from './ProductionNavSection'
import { ResearchNavSection } from './ResearchNavSection'

export function WorkspaceNav() {
  return (
    <nav aria-label="Workspace" className="flex flex-col gap-5">
      <ResearchNavSection />
      <ProductionNavSection />
      <EngineeringNavSection />
    </nav>
  )
}
