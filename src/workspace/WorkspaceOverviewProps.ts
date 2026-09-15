import type { Library } from '@/contracts/Library'

export type WorkspaceOverviewProps = {
  library: Library
  company: string
  onChange: (company: string) => void
}
