/** The parts of an episode's transcript.json the publisher reads. */
export type EpisodeTranscript = {
  readonly source: { readonly title: string; readonly durationSeconds: number }
  readonly stats: unknown
  readonly asrModel: string
  readonly asrSeconds: number
}
