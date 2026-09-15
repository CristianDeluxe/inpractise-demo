/**
 * A quotation must be a substring of the passage it is attributed to. Runs of
 * whitespace are collapsed on both sides first, because a passage's line
 * breaks are layout, not content, and a model that rewraps a sentence has not
 * changed what was said.
 */
export function quoteOccursIn(quote: string, text: string): boolean {
  const collapse = (value: string) => value.replaceAll(/\s+/g, ' ').trim()
  const needle = collapse(quote)
  return needle.length > 0 && collapse(text).includes(needle)
}
