/** Scales levels so the loudest is 1, rounded to three decimals to keep the file small. */
export function normalizePeaks(levels: readonly number[]): number[] {
  const loudest = Math.max(0, ...levels)
  if (loudest === 0) return levels.map(() => 0)
  return levels.map((level) => Math.round((level / loudest) * 1000) / 1000)
}
