/** A stored pgvector arrives as text; anything but 1536 finite numbers is a miss. */
export function parseStoredVector(stored: unknown): number[] | null {
  if (typeof stored !== 'string') return null
  let parsed: unknown
  try {
    parsed = JSON.parse(stored)
  } catch {
    return null
  }
  if (
    !Array.isArray(parsed) ||
    parsed.length !== 1_536 ||
    !parsed.every(
      (value) => typeof value === 'number' && Number.isFinite(value),
    )
  )
    return null
  return parsed as number[]
}
