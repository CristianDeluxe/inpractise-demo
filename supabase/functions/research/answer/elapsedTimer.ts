/**
 * A running split timer: each call reports milliseconds since the previous
 * call (or since creation, for the first), then resets. Used to attach a
 * per-phase duration to each streamed stage without threading timestamps
 * through every step of the pipeline by hand.
 */
export function elapsedTimer(): () => number {
  let last = Date.now()
  return () => {
    const now = Date.now()
    const elapsedMs = now - last
    last = now
    return elapsedMs
  }
}
