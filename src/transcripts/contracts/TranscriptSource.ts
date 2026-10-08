/** Where the audio came from. Shown on every surface that displays the transcript. */
export type TranscriptSource = {
  readonly youtubeId: string
  readonly title: string
  readonly channel: string
  readonly url: string
  readonly durationSeconds: number
  readonly uploadDate: string
}
