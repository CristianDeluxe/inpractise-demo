/** Heuristic risk signals attached to a word, independent of ASR confidence. */
export type WordFlag =
  'low-confidence' | 'entity' | 'number' | 'filler' | 'repetition' | 'memory'
