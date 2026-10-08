import type { DiffOp } from './DiffOp.ts'
import type { Hunk } from './Hunk.ts'

/** Groups consecutive deletes and inserts into hunks, using the original words on both sides. */
export function opsToHunks(
  ops: readonly DiffOp[],
  raw: readonly string[],
  final: readonly string[],
): Hunk[] {
  const hunks: Hunk[] = []
  let removed: string[] = []
  let added: string[] = []
  const flush = (): void => {
    if (removed.length === 0 && added.length === 0) return
    hunks.push({ from: removed.join(' '), to: added.join(' ') })
    removed = []
    added = []
  }
  for (const op of ops) {
    if (op.kind === 'keep') flush()
    else if (op.kind === 'delete') removed.push(raw[op.index] ?? '')
    else added.push(final[op.index] ?? '')
  }
  flush()
  return hunks
}
