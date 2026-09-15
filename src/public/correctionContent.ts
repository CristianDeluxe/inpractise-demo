// Corrections recorded in TODO_LOG.md, in the words of the entries that closed
// them. Each was found by a gate or a live check, not by rereading the code.
export const correctionContent = [
  {
    title: 'The Edge function refused every browser',
    body: 'CORS allowed only authorization and content-type, so each browser request failed its preflight while every unit and Deno test passed. The first real browser session found it; the fix allowed apikey and x-client-info and was verified with a live OPTIONS probe returning 204.',
  },
  {
    title: 'Revoked evidence left its prose behind',
    body: 'buildAskResult dropped the citation of a passage the caller had lost access to but kept the claim text. The method page shipped admitting it. The fix drops the claim, turns an answer with no surviving evidence into not_found, and the evaluation gate was rerun.',
  },
  {
    title: 'Three of the four landing figures were wrong',
    body: 'The corpus statistics on the first screen were decorative copy. They now read from one file that a unit test recomputes from corpus/manifest.json, so a corpus change that is not reflected there fails the suite.',
  },
  {
    title: 'A rename shipped without its lockfile',
    body: 'Commit 3f3dc7d moved the shared configs to the @syntopica scope but not the regenerated pnpm-lock.yaml, so CI failed at install. The next commit renamed and regenerated together, and the run went green.',
  },
  {
    title: 'The plan itself had defects',
    body: 'The evidence-integrity plan named EvidenceVintage.ts and evidenceVintage.ts, one path on a case-insensitive volume, and prescribed two unexported top-level declarations and a helper the strict policy rejects. The first implementer hit all three; the plan was corrected before the work continued.',
  },
  {
    title: 'Production answered 503 to every authenticated API call',
    body: 'The Node origin did not load its own .env under the CloudLinux selector, so RESEARCH_URL was unset in production. A request against the live host found it, not a local gate; server/loadOriginEnv.mjs closed it.',
  },
] as const
