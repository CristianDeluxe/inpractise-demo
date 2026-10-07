import type { AskHistoryTurn } from './AskHistoryTurn.ts'

/** A validated ask request, with its optional fields still optional. */
export type AskRequestInput = {
  query: string
  company?: string | undefined
  history?: readonly AskHistoryTurn[] | undefined
}
