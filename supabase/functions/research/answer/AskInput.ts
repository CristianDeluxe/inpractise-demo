import type { AskHistoryTurn } from './AskHistoryTurn.ts'

export type AskInput = {
  query: string
  company: string | undefined
  history: readonly AskHistoryTurn[]
}
