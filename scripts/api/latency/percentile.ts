/** Nearest-rank percentile, the convention docs/api-latency.json already uses. */
export function percentile(samples: readonly number[], rank: number): number {
  if (!samples.length) throw new Error('No samples')
  const sorted = [...samples].sort((a, b) => a - b)
  const index = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil((rank / 100) * sorted.length) - 1),
  )
  return Math.round(sorted[index] ?? 0)
}
