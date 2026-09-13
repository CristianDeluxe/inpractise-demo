import { countTokens } from './countTokens.mjs'

export function splitTurnFragments(text) {
  const chars = Array.from(text)
  const fragments = []
  let start = 0
  while (start < chars.length) {
    let end = Math.min(start + 1200, chars.length)
    while (countTokens(chars.slice(start, end).join('')) > 450) end--
    if (end < chars.length) {
      const text = chars.slice(start, end).join('')
      const boundaries = [...text.matchAll(/[.!?]["')]?\s+/gu)]
      const last = boundaries.at(-1)
      if (last && last.index > text.length / 2)
        end =
          start + Array.from(text.slice(0, last.index + last[0].length)).length
    }
    if (end <= start) throw new Error('PASSAGE_SPLIT_STALLED')
    fragments.push({ start, end, text: chars.slice(start, end).join('') })
    start = end
  }
  return fragments
}
