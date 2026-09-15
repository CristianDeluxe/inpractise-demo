/** Renders a phase's server-side duration for a stage label, or nothing when the server omitted it. */
export function stageTiming(elapsedMs: number | undefined): string {
  return elapsedMs === undefined ? '' : ` · ${String(elapsedMs)}ms`
}
