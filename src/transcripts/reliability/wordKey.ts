/** A word reduced to its lowercase letters, for comparing spoken forms. */
export function wordKey(text: string) {
  return text.replace(/^\P{L}+|\P{L}+$/gu, '').toLowerCase()
}
