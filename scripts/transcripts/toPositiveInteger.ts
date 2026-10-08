export function toPositiveInteger(
  value: string | undefined,
  name: string,
): number | undefined {
  if (value === undefined) return undefined
  const parsed = Number.parseInt(value, 10)
  if (!Number.isInteger(parsed) || parsed < 1)
    throw new Error(`${name} must be a positive integer`)
  return parsed
}
