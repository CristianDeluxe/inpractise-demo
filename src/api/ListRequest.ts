import type { DocumentKind } from './DocumentKind.ts'
import type { ViewAs } from './ViewAs.ts'

export type ListRequest = {
  viewAs?: ViewAs
  action: 'list'
  company?: string
  kind?: DocumentKind
}
