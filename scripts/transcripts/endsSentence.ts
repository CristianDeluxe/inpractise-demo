export function endsSentence(word: string): boolean {
  return /[.?!]["')\]]*$/.test(word)
}
