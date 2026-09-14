import { z } from 'zod'

/**
 * Compare at float32 precision, matching database vector storage rather than
 * JavaScript's wider numbers. Exact double comparison would reject a faithfully
 * persisted embedding after its storage round trip.
 */
export function assertStoredVector(stored: unknown, expected: number[]): void {
  const parsed = z
    .array(z.number())
    .length(1536)
    .safeParse(typeof stored === 'string' ? JSON.parse(stored) : stored)
  if (!parsed.success || expected.length !== parsed.data.length)
    throw new Error('Persisted database vector mismatch')
  for (const [index, value] of parsed.data.entries()) {
    const target = expected[index]
    if (target === undefined || Math.fround(value) !== Math.fround(target))
      throw new Error('Persisted database vector mismatch')
  }
}
