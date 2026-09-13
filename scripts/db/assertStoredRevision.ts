import { canonicalJson } from './canonicalJson.ts'

export function assertStoredRevision(
  stored: Record<string, unknown>,
  expected: Record<string, unknown>,
): void {
  for (const [key, value] of Object.entries(expected)) {
    if (
      stored['published'] === true &&
      (key === 'rights_basis' || key === 'coverage')
    )
      continue
    const actual = stored[key]
    if (key === 'published_at') {
      if (Date.parse(String(actual)) !== Date.parse(String(value)))
        throw new Error('Existing revision publication date mismatch')
      continue
    }
    if (canonicalJson(actual) !== canonicalJson(value))
      throw new Error(`Existing revision metadata mismatch: ${key}`)
  }
}
