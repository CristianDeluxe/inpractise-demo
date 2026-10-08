export function splitWords(text: string): string[] {
  return text.split(/\s+/u).filter((word) => word !== '')
}
