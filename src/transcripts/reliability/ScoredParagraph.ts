import type { ScoredWord } from './ScoredWord'

export type ScoredParagraph = {
  readonly id: string
  readonly start: number
  readonly words: readonly ScoredWord[]
}
