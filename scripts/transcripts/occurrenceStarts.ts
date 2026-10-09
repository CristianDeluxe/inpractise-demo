export function occurrenceStarts(text: string, needle: string): number[] {
  const starts: number[] = []
  for (
    let at = text.indexOf(needle);
    at !== -1 && needle !== '';
    at = text.indexOf(needle, at + 1)
  )
    starts.push(at)
  return starts
}
