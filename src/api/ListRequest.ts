import type { DocumentKind } from './DocumentKind.ts'

export type ListRequest = {
  action: 'list'
  company?: string
  kind?: DocumentKind
}
