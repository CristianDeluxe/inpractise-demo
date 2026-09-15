import type { CompareSideName } from './CompareSideName.ts'

/** How each side is named in a message to the reader. */
export const sideLabels: Record<CompareSideName, string> = {
  interviews: 'interview',
  filings: 'filing',
}
