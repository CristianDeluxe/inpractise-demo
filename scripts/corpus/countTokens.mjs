import { tokenizer } from './tokenizer.mjs'

export function countTokens(text) {
  return tokenizer.encode(text, [], []).length
}
