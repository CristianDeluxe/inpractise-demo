/** How much the learned memory contributed to a run. */
export type CorrectionMemoryUse = {
  readonly glossaryEntries: number
  readonly glossaryHits: number
  readonly examplesUsed: number
}
