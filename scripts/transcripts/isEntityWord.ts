import { entityStoplist } from './entityStoplist.ts'
import { stripEdgePunctuation } from './stripEdgePunctuation.ts'

/** Capitalised and not sentence-initial, or ALL CAPS with at least two letters. */
export function isEntityWord(text: string, sentenceStart: boolean): boolean {
  const core = stripEdgePunctuation(text)
  if (core === '' || entityStoplist.has(core)) return false
  const letters = core.replaceAll(/\P{L}/gu, '')
  if (letters.length >= 2 && letters === letters.toUpperCase()) return true
  return !sentenceStart && /^\p{Lu}/u.test(core)
}
