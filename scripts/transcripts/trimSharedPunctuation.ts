import { isWordCharacter } from './isWordCharacter.ts'
import type { PunctuationTrim } from './PunctuationTrim.ts'

/** Drops punctuation that both sides share at either edge, so "Foo," -> "Bar," learns Foo -> Bar. */
export function trimSharedPunctuation(
  from: string,
  to: string,
): PunctuationTrim {
  let left = from
  let right = to
  while (
    left.length > 0 &&
    right.length > 0 &&
    left.at(-1) === right.at(-1) &&
    !isWordCharacter(left.at(-1))
  ) {
    left = left.slice(0, -1)
    right = right.slice(0, -1)
  }
  while (
    left.length > 0 &&
    right.length > 0 &&
    left[0] === right[0] &&
    !isWordCharacter(left[0])
  ) {
    left = left.slice(1)
    right = right.slice(1)
  }
  return { from: left, to: right }
}
