/** True when the character is absent or not a letter or digit. */
export function isWordBoundary(character: string | undefined): boolean {
  return character === undefined || !/[\p{L}\p{N}]/u.test(character)
}
