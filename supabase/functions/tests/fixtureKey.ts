/**
 * `document_revisions` is queried with three different shapes: the citation
 * reader selects source metadata for one revision, revision currency selects
 * `is_current` for a set of revisions, and the investigation planner selects
 * only `company`. All share a pathname, so the fixture key is derived from the
 * actual `select` list the production query sends, not from an arbitrary
 * marker.
 */
export function fixtureKey(url: URL): string {
  const pathname = url.pathname
  const select = url.searchParams.get('select') ?? ''
  if (pathname === '/rest/v1/document_revisions') {
    if (select.includes('is_current')) return `${pathname}?currency`
    if (select.startsWith('company,')) return `${pathname}?companies`
  }
  return pathname
}
