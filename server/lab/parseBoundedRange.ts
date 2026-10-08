import type { ByteRange } from './ByteRange.ts'

/** `bytes=a-` or `bytes=a-b`. */
export function parseBoundedRange(
  first: string,
  last: string,
  size: number,
): ByteRange | null {
  const start = Number(first)
  const end = last === '' ? size - 1 : Math.min(Number(last), size - 1)
  return start <= end && start < size ? { start, end } : null
}
