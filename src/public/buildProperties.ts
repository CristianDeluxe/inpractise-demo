// The three properties AGENTS.md names as the point of the build, each with the
// public page that shows the property at work.
export const buildProperties = [
  {
    kicker: 'Evidence',
    title: 'A citation is an address.',
    body: 'Every claim carries a document, revision and passage ID, an exact quotation, a date and a speaker. The link opens the passage the answer actually used.',
    action: 'Read the standards',
    to: '/method',
  },
  {
    kicker: 'Retrieval',
    title: 'A miss is not a refusal.',
    body: 'Candidate recall is measured before context selection, so a retrieval failure stays distinguishable from missing knowledge. Selection miss F03 is kept on record rather than tuned away, and a provider error stays an error.',
    action: 'See how it was built',
    to: '/built',
  },
  {
    kicker: 'Access',
    title: 'Authorised before it leaves the database.',
    body: 'Row-level security scopes every read to the signed-in member. No service-role key sits in a retrieval path, and the browser and the local MCP server get identical outcomes.',
    action: 'Connect over MCP',
    to: '/connect',
  },
] as const
