/** A 0-1 rate as a percentage with two decimals, e.g. 0.0274 as "2.74%". */
export function formatRate(rate: number) {
  return `${(rate * 100).toFixed(2)}%`
}
