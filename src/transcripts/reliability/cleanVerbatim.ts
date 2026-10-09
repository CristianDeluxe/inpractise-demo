import { foldSentenceEnd } from './foldSentenceEnd'
import { isFiller } from './isFiller'
import { mergeStutter } from './mergeStutter'
import type { ScoredWord } from './ScoredWord'

/**
 * The final is clean verbatim: fillers the corrector left (often inside an
 * uncertain edit that keeps the heard words) are dropped, and a filler that
 * opened a sentence passes its capital to the next word. An immediate
 * one-word repeat ("pretty pretty") is a stutter and reads once.
 */
export function cleanVerbatim(words: readonly ScoredWord[]): ScoredWord[] {
  const out: ScoredWord[] = []
  let capitalise = false
  for (const word of words) {
    if (isFiller(word.text)) {
      const previous = out.pop()
      if (previous !== undefined) out.push(foldSentenceEnd(previous, word.text))
      capitalise ||= /^\p{Lu}/u.test(word.text)
      continue
    }
    const text = capitalise
      ? word.text.charAt(0).toUpperCase() + word.text.slice(1)
      : word.text
    const previous = out.at(-1)
    const merged =
      previous === undefined ? null : mergeStutter(previous, { ...word, text })
    if (merged === null) out.push({ ...word, text })
    else out[out.length - 1] = merged
    capitalise = false
  }
  return out
}
