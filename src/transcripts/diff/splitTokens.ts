export function splitTokens(text: string) {
  return text.split(/\s+/u).filter((token) => token !== '')
}
