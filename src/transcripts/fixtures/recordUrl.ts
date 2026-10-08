/** Notes which URL a request went to and returns it. */
export function recordUrl(
  urls: string[],
  input: Parameters<typeof fetch>[0],
): string {
  const url = input instanceof Request ? input.url : input.toString()
  urls.push(url)
  return url
}
