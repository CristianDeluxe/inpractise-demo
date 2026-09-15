/** Milliseconds since the clock started, rounded, for every stage's `elapsedMs`. */
export function startClock(): () => number {
  const startedAt = performance.now()
  return () => Math.round(performance.now() - startedAt)
}
