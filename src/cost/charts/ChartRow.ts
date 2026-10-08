import type { ChartSegment } from './ChartSegment'

/** One labelled bar; the text says every number the bar draws. */
export type ChartRow = {
  readonly key: string
  readonly label: string
  readonly segments: readonly ChartSegment[]
  readonly text: string
}
