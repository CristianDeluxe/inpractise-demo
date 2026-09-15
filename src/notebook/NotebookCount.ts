/** The badge's number, or null when the server did not report one. */
export type NotebookCount = {
  count: number | null
  adjust: (delta: number) => void
}
