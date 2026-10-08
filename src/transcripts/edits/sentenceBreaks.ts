/** Offsets just after sentence-final punctuation and the space that follows it. */
export function sentenceBreaks(raw: string): number[] {
  const breaks: number[] = []
  for (const match of raw.matchAll(/[.?!]["')\]]*\s+/gu)) {
    const end = match.index + match[0].length
    if (end < raw.length) breaks.push(end)
  }
  return breaks
}
