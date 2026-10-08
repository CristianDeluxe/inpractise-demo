import type { ByteRange } from './ByteRange.ts'

/** `bytes=-n`: the last n bytes. */
export function parseSuffixRange(last: string, size: number): ByteRange | null {
  const suffix = Number(last)
  if (suffix <= 0 || size <= 0) return null
  return { start: Math.max(size - suffix, 0), end: size - 1 }
}
