/** The id one step away from `current`, clamped at both ends; the first or last id when nothing is current. */
export function adjacentId(
  ids: readonly string[],
  current: string | null,
  step: 1 | -1,
) {
  if (ids.length === 0) return null
  const index = current === null ? -1 : ids.indexOf(current)
  if (index === -1) return (step === 1 ? ids[0] : ids.at(-1)) ?? null
  return ids[Math.min(Math.max(index + step, 0), ids.length - 1)] ?? null
}
