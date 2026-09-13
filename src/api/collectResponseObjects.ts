import { ApiError } from './ApiError.ts'

/** Traverses JSON without assigning undocumented action fields or nesting. */
export function collectResponseObjects(
  input: unknown,
): Record<string, unknown>[] {
  const queue: { value: unknown; depth: number }[] = [
    { value: input, depth: 0 },
  ]
  const objects: Record<string, unknown>[] = []
  const seen = new Set<object>()
  while (queue.length) {
    const entry = queue.pop()
    if (!entry || entry.value === null || typeof entry.value !== 'object')
      continue
    if (entry.depth > 64 || seen.has(entry.value))
      throw new ApiError(
        'protocol',
        'The response contains invalid nested data.',
      )
    seen.add(entry.value)
    if (Array.isArray(entry.value)) {
      for (const value of entry.value)
        queue.push({ value, depth: entry.depth + 1 })
    } else {
      const value = entry.value as Record<string, unknown>
      objects.push(value)
      for (const child of Object.values(value))
        queue.push({ value: child, depth: entry.depth + 1 })
    }
  }
  return objects
}
