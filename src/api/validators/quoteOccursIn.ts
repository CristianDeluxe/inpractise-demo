/**
 * The same check the server applies: a quotation occurs in its passage once
 * runs of whitespace are collapsed on both sides. Re-verified here so a claim
 * whose quotation the server did not check can never render.
 */
export function quoteOccursIn(quote: string, text: string): boolean {
  const collapse = (value: string) => value.replaceAll(/\s+/g, ' ').trim()
  const needle = collapse(quote)
  return needle.length > 0 && collapse(text).includes(needle)
}
