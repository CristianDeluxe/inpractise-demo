import type { TurnWords } from './TurnWords'

/** Where each turn's timestamp replays from: the paragraph start for the first, its first word after that. */
export function turnStarts(
  paragraphStart: number,
  turns: readonly TurnWords[],
): number[] {
  return turns.map((turn, index) =>
    index === 0 ? paragraphStart : (turn.words[0]?.start ?? paragraphStart),
  )
}
