import type { ScoredWord } from '../reliability/ScoredWord'

export type ScoredWordButtonProps = {
  readonly word: ScoredWord
  readonly onSeek: (seconds: number) => void
}
