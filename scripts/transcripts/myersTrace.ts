import { furthestReach } from './furthestReach.ts'
import { slideDiagonal } from './slideDiagonal.ts'

/**
 * Forward pass of Myers' O((N+M)D) diff. Entry d holds the furthest-reaching
 * x per diagonal k (from -d-1 to d+1) as it stood before round d.
 */
export function myersTrace(
  a: readonly string[],
  b: readonly string[],
): Int32Array[] {
  const max = a.length + b.length
  const offset = max + 1
  const v = new Int32Array(2 * max + 4)
  const trace: Int32Array[] = []
  for (let d = 0; d <= max; d += 1) {
    trace.push(v.slice(offset - d - 1, offset + d + 2))
    for (let k = -d; k <= d; k += 2) {
      const x = slideDiagonal(a, b, furthestReach(v, offset, k, d), k)
      v[offset + k] = x
      if (x >= a.length && x - k >= b.length) return trace
    }
  }
  return trace
}
