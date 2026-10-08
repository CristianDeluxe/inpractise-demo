import type { RawToken } from '../../scripts/transcripts/RawToken.ts'

export function tokenFixture(
  text: string,
  start: number,
  confidence: number,
): RawToken {
  return { text, start, end: start + 0.1, confidence }
}
