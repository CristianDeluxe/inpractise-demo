/** What the lab rows do not carry: the interview's own short title and document. */
export type Episode = {
  readonly documentId: string
  readonly title: string
  /** Who the diarization's host and guest roles are, from the episode's public metadata. */
  readonly host: string
  readonly guest: string
}
