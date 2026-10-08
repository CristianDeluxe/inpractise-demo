/**
 * Joins the text around a removed word. Raw text has single spaces and
 * punctuation attached to words, so the removal can only leave a double space,
 * a space before punctuation, or a space at an edge; only that space goes.
 */
export function joinAfterRemoval(before: string, after: string): string {
  if (before === '') return after.trimStart()
  if (after === '') return before.trimEnd()
  if (before.endsWith(' ') && /^[ ,.;:!?]/u.test(after))
    return before.slice(0, -1) + after
  return before + after
}
