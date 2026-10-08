export function tallyKeys(keys: readonly string[]): string {
  const counts = new Map<string, number>()
  for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1)
  return (
    [...counts].map(([key, count]) => `${key} ${String(count)}`).join(', ') ||
    'none'
  )
}
