/** Visitor-supplied text with control and non-ASCII characters replaced, cut to a length. */
export function printable(value, length) {
  return String(value)
    .replace(/[^\x20-\x7e]/gu, '?')
    .slice(0, length)
}
