import { normalizeToken } from '../diff/normalizeToken'
import type { TokenOffset } from './TokenOffset'

/** Words of `text` with offsets, skipping tokens that are only punctuation. */
export function tokenOffsets(text: string): TokenOffset[] {
  return [...text.matchAll(/\S+/gu)]
    .map((match) => ({
      key: normalizeToken(match[0]),
      start: match.index,
      end: match.index + match[0].length,
    }))
    .filter((token) => token.key !== '')
}
