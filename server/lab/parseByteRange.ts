import type { ByteRange } from './ByteRange.ts'
import { parseBoundedRange } from './parseBoundedRange.ts'
import { parseSuffixRange } from './parseSuffixRange.ts'

/** Parses a single range header; null when absent, malformed or unsatisfiable. */
export function parseByteRange(
  header: string | undefined,
  size: number,
): ByteRange | null {
  const match = /^bytes=(\d*)-(\d*)$/u.exec(header ?? '')
  if (match === null) return null
  const first = match[1] ?? ''
  const last = match[2] ?? ''
  if (first === '') return last === '' ? null : parseSuffixRange(last, size)
  return parseBoundedRange(first, last, size)
}
