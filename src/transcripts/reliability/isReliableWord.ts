import { reliableWordThreshold } from './reliableWordThreshold'
import type { ScoredWord } from './ScoredWord'

export function isReliableWord(word: ScoredWord): boolean {
  return word.score >= reliableWordThreshold
}
