import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import { normalizeToken } from '../diff/normalizeToken'
import { splitTokens } from '../diff/splitTokens'
import { findKeySequence } from '../text/findKeySequence'
import { tokenOffsets } from '../text/tokenOffsets'
import type { EditRange } from './EditRange'

/** Character range of each edit's replacement in the corrected text, in reading order. */
export function locateEditRanges(
  text: string,
  edits: readonly CorrectionEdit[],
): EditRange[] {
  const tokens = tokenOffsets(text)
  const ranges: EditRange[] = []
  let cursor = 0
  for (const edit of edits) {
    const keys = splitTokens(edit.to)
      .map(normalizeToken)
      .filter((key) => key !== '')
    const index = findKeySequence(tokens, keys, cursor)
    const first = tokens[index]
    const last = tokens[index + keys.length - 1]
    if (index < 0 || !first || !last) continue
    ranges.push({ edit, start: first.start, end: last.end })
    cursor = index + keys.length
  }
  return ranges
}
