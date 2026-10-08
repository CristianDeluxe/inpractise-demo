import type { VisibleChar } from './VisibleChar'

export function visibleChars(text: string): VisibleChar[] {
  const chars: VisibleChar[] = []
  let at = 0
  for (const char of text) {
    if (!/\s/u.test(char)) chars.push({ char, at })
    at += char.length
  }
  return chars
}
