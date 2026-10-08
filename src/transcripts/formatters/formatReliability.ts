/** A 0 to 1 share as a percentage with one decimal, e.g. 0.9437 becomes 94.4%. */
export function formatReliability(share: number): string {
  return `${(share * 100).toFixed(1)}%`
}
