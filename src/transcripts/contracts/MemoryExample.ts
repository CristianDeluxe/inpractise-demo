/** One accepted raw/corrected paragraph pair, retrieved as a few-shot example in later runs. */
export type MemoryExample = {
  readonly transcriptId: string
  readonly paragraphId: string
  readonly raw: string
  readonly corrected: string
}
