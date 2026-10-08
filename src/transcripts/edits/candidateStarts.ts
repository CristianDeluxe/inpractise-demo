import type { PlaceableEdit } from './PlaceableEdit'
import { wholeWordStarts } from './wholeWordStarts'

/**
 * Recorded offsets that still hold `from`; without them, every whole-word
 * occurrence for a memory edit (a glossary entry rewrites them all) and the
 * occurrences in reading order for a model edit, of which one is taken.
 */
export function candidateStarts(raw: string, edit: PlaceableEdit) {
  const recorded = (edit.at ?? []).filter((start) =>
    raw.startsWith(edit.from, start),
  )
  if (recorded.length > 0) return { starts: recorded, every: true }
  return {
    starts: wholeWordStarts(raw, edit.from),
    every: edit.origin === 'memory',
  }
}
