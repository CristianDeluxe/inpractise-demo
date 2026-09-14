/**
 * `document_revisions` is queried with two different shapes: the citation
 * reader selects source metadata for one revision, and revision currency
 * selects `is_current` for a set of revisions. Both requests share a
 * pathname, so the fixture key is derived from the actual `select` list the
 * production query sends, not from an arbitrary marker.
 */
export function fixtureKey(url: URL): string {
  const pathname = url.pathname
  if (
    pathname === '/rest/v1/document_revisions' &&
    url.searchParams.get('select')?.includes('is_current')
  )
    return `${pathname}?currency`
  return pathname
}
