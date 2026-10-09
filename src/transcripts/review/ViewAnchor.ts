/** The paragraph a reader was looking at when the view changed, and where on screen it sat. */
export type ViewAnchor = {
  readonly id: string
  /** Seconds, from the paragraph's `data-start`. */
  readonly start: number
  /** Distance from the toolbar's bottom edge to the paragraph's top edge. */
  readonly offset: number
}
