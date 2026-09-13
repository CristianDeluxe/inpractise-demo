export type SearchRequest = {
  action: 'search'
  query: string
  company?: string
  limit?: number
}
