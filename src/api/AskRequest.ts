import type { ViewAs } from './ViewAs.ts'

export type AskRequest = {
  viewAs?: ViewAs
  action: 'ask'
  query: string
  company?: string
}
