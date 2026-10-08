/** Lower-cases a word and strips surrounding punctuation so spans match across commas and casing. */
export function matchKey(word: string): string {
  return word.toLowerCase().replaceAll(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
}
