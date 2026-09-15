/**
 * The notebook read must rely on row level security for its scope: it carries
 * the caller's token and sends no identity of its own for the database to
 * trust instead.
 */
export function assertCallerScopedListing(requests: readonly Request[]) {
  const listing = requests.find((request) =>
    request.url.includes('/rest/v1/research_notes'),
  )
  if (!listing) throw new Error('Notebook was not read')
  if (listing.headers.get('authorization') !== 'Bearer test-caller-token')
    throw new Error('Listing did not carry the caller token')
  if (new URL(listing.url).searchParams.has('user_id'))
    throw new Error('Listing filtered by a caller-supplied identity')
}
