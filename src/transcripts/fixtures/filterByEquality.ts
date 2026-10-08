/** Applies PostgREST `column=eq.value` filters from a query string to plain rows. */
export function filterByEquality(
  rows: readonly unknown[],
  params: URLSearchParams,
): unknown[] {
  return rows.filter((row) =>
    [...params.entries()]
      .filter(([, value]) => value.startsWith('eq.'))
      .every(
        ([column, value]) =>
          String((row as Record<string, unknown>)[column]) === value.slice(3),
      ),
  )
}
