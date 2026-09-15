/** Runs one measurement sequentially `count` times and returns every result. */
export async function repeat<T>(
  count: number,
  measure: () => Promise<T>,
): Promise<T[]> {
  const results: T[] = []
  for (let index = 0; index < count; index += 1) results.push(await measure())
  return results
}
