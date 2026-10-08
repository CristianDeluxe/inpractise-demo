/**
 * Max-pools the envelope to `bars` values and stretches it between its 5th and
 * 99th percentile, so steady speech still shows its shape instead of a block.
 */
export function resamplePeaks(
  peaks: readonly number[],
  bars: number,
): number[] {
  if (peaks.length === 0 || bars <= 0) return []
  const sorted = [...peaks].sort((a, b) => a - b)
  const floor = sorted[Math.floor(sorted.length * 0.05)] ?? 0
  const ceiling = sorted[Math.floor(sorted.length * 0.99)] ?? 1
  const span = Math.max(ceiling - floor, 1e-6)
  const pooled: number[] = []
  for (let bar = 0; bar < bars; bar += 1) {
    const first = Math.floor((bar * peaks.length) / bars)
    const last = Math.max(
      first + 1,
      Math.floor(((bar + 1) * peaks.length) / bars),
    )
    const level = Math.max(...peaks.slice(first, last))
    pooled.push(Math.min(1, Math.max(0.06, (level - floor) / span)))
  }
  return pooled
}
