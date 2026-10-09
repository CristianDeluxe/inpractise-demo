/** The part of one docs/transcript-quality.json episode that the UI snapshot mirrors. */
export type QualityReportEpisode = {
  readonly edits: number
  readonly styleOnly: number
  readonly agreement: {
    readonly whisper: {
      readonly raw: { readonly wer: number }
      readonly final: { readonly wer: number }
    }
  }
  readonly contentEdits: {
    readonly applied: Partial<
      Record<'confirmed' | 'contradicted' | 'contested', number>
    >
  }
}
