import type { PlaceableEdit } from './PlaceableEdit'
import { wholeWordStarts } from './wholeWordStarts'

/**
 * Recorded offsets when the edit has them; a recorded offset that no longer
 * holds `from` is dropped rather than moved, so a stale run never rewrites a
 * different word. Runs written before offsets existed fall back to every
 * whole-word occurrence for a memory edit (a glossary entry rewrites them all)
 * and the occurrences in reading order for a model edit, of which one is taken.
 */
export function candidateStarts(raw: string, edit: PlaceableEdit) {
  if (edit.at !== undefined)
    return {
      starts: edit.at.filter((start) => raw.startsWith(edit.from, start)),
      every: true,
    }
  return {
    starts: wholeWordStarts(raw, edit.from),
    every: edit.origin === 'memory',
  }
}
