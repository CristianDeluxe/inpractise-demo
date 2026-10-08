import type { DiffOp } from './DiffOp.ts'

/** Walks a Myers trace from the end back to the start and returns the edit script in order. */
export function backtrackTrace(
  trace: readonly Int32Array[],
  n: number,
  m: number,
): DiffOp[] {
  const ops: DiffOp[] = []
  let x = n
  let y = m
  for (let d = trace.length - 1; d >= 0; d -= 1) {
    const row = trace[d]
    if (row === undefined) break
    const at = (k: number): number => row[k + d + 1] ?? 0
    const k = x - y
    const down = k === -d || (k !== d && at(k - 1) < at(k + 1))
    const previousK = down ? k + 1 : k - 1
    const previousX = at(previousK)
    const previousY = previousX - previousK
    while (x > previousX && y > previousY) {
      ops.push({ kind: 'keep', index: x - 1 })
      x -= 1
      y -= 1
    }
    if (d > 0) {
      if (x === previousX) {
        ops.push({ kind: 'insert', index: y - 1 })
        y -= 1
      } else {
        ops.push({ kind: 'delete', index: x - 1 })
        x -= 1
      }
    }
  }
  return ops.toReversed()
}
