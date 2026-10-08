/** Case- and punctuation-insensitive form used only for matching words. */
export function normalizeToken(token: string) {
  return token.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '')
}
