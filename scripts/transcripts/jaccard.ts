export function jaccard(
  a: ReadonlySet<string>,
  b: ReadonlySet<string>,
): number {
  let shared = 0
  for (const token of a) if (b.has(token)) shared += 1
  const union = a.size + b.size - shared
  return union === 0 ? 0 : shared / union
}
