export function requireValue<T>(value: T | undefined | null): T {
  if (value === undefined || value === null)
    throw new Error('Required fixture or query result is missing')
  return value
}
