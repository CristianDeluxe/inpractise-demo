import type { ViewAs } from './ViewAs.ts'

export type SearchRequest = {
  viewAs?: ViewAs
  action: 'search'
  query: string
  company?: string
  limit?: number
}
