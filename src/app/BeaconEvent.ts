/** A page view, or the time spent visible on a page when it is left. */
export type BeaconEvent = {
  readonly kind: 'view' | 'leave'
  readonly path: string
  readonly ms: number | null
  /** Random per browser tab, to group one visit's events. */
  readonly tab: string
}
