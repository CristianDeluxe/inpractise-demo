import type { ScoredWord } from '../reliability/ScoredWord'

export type ScoredWordsProps = {
  readonly words: readonly ScoredWord[]
  readonly onSeek: (seconds: number) => void
}
