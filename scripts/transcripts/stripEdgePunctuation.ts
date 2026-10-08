export function stripEdgePunctuation(word: string): string {
  return word.replaceAll(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
}
