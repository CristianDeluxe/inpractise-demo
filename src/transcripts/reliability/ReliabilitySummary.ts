import type { EditCounts } from './EditCounts'

/**
 * Reliability of the AI-final text. Every final word has a score in [0, 1];
 * a word is reliable when its score reaches reliableWordThreshold, and the
 * transcript's reliability is the share of final words that are. Words below
 * the threshold are the optional spot-check.
 */
export type ReliabilitySummary = {
  readonly words: number
  readonly reliableWords: number
  readonly spotCheckWords: number
  /** reliableWords / words, 0 to 1. */
  readonly reliability: number
  readonly edits: EditCounts
}
