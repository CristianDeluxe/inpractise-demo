export function requireVariable(
  values: Record<string, string>,
  name: string,
): string {
  const value = Object.hasOwn(values, name) ? values[name] : undefined
  if (!value) throw new Error(`Missing variables: ${name}`)
  return value
}
