import type { AskHistoryTurn } from './AskHistoryTurn.ts'

export type ResolveAndSelectInput = {
  query: string
  company: string | undefined
  history: readonly AskHistoryTurn[]
  detailed: boolean
  elapsed: () => number
}
