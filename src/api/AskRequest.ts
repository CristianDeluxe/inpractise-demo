import type { AskHistoryTurn } from './AskHistoryTurn.ts'
import type { ViewAs } from './ViewAs.ts'

export type AskRequest = {
  viewAs?: ViewAs
  action: 'ask'
  query: string
  company?: string
  history?: AskHistoryTurn[]
}
