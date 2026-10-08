import type { DecisionHistoryEntry } from '../hooks/DecisionHistoryEntry'
import { undoLimit } from './undoLimit'

/** Adds one entry to the undo history, dropping the oldest past the limit. */
export function pushHistory(
  history: readonly DecisionHistoryEntry[],
  entry: DecisionHistoryEntry,
): DecisionHistoryEntry[] {
  return [...history, entry].slice(-undoLimit)
}
