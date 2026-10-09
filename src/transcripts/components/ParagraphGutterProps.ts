export type ParagraphGutterProps = {
  readonly start: number
  readonly note: string | null
  readonly onSeek: (seconds: number) => void
}
