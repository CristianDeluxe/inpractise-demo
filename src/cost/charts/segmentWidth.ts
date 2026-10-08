/** Share of the track a segment fills, as a CSS percentage. */
export function segmentWidth(value: number, maximum: number): string {
  return `${String(maximum > 0 ? (value / maximum) * 100 : 0)}%`
}
