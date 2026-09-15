// Cuts taken from the plan's disposition tables, section 2, with what stands
// in each one's place. Two were partly reversed later and say so.
export const cutContent = [
  {
    cut: 'Plans, subscriptions, seats, invitations and billing pages',
    kept: 'Membership carries two server-owned booleans, active and premium. Revocation still has a failing test.',
  },
  {
    cut: 'SSO, SCIM, MFA, OAuth identity linking and remote MCP OAuth',
    kept: 'Privately provisioned password accounts with public signup disabled. The MCP server runs locally over stdio as an ordinary member.',
  },
  {
    cut: 'A 37-table schema and an 84-route catalogue',
    kept: 'Five tables, private policy helpers and six read actions. A seventh, provenance, was added on the second day with its own tests.',
  },
  {
    cut: 'Streamed tokens, threads, persisted history and a query planner',
    kept: 'One bounded JSON answer per standalone question. On the third day the answer began streaming its stages, still publishing once, and follow-ups were accepted by rewriting them before retrieval; ADR 0010 rejects provisional claims and stored answers.',
  },
  {
    cut: 'Reranker, MMR diversity and a per-user embedding cache',
    kept: 'Lexical plus vector fusion with a two-passages-per-document cap. The F03 selection miss that cap causes is retained and documented rather than tuned away.',
  },
  {
    cut: 'PDF, OCR and table ingestion, an upload UI and leased workers',
    kept: 'Transcripts and SEC narrative HTML normalised once by a local CLI and published in one transaction. Excluded sections are listed, not hidden.',
  },
  {
    cut: 'Collections, follows, alerts, admin CRUD and impersonation',
    kept: 'A read-only inspector over actual corpus counts, source hashes and the current evaluation report. Viewing as a lesser principal is downgrade-only and enforced by the server.',
  },
] as const
