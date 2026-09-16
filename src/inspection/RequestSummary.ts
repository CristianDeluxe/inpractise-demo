export type RequestSummary = {
  kind: 'Ask' | 'Compare' | 'Unrecorded'
  ranked: number | null
  selected: number | null
  contextTokens: number | null
}
