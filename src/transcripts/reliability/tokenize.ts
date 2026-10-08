import type { TextToken } from './TextToken'

export function tokenize(text: string): TextToken[] {
  return Array.from(text.matchAll(/\S+/gu), (match) => ({
    text: match[0],
    at: match.index,
  }))
}
