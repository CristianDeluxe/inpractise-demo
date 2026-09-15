import type { BuildHalfDayKey } from './BuildHalfDayKey'

// One sentence per half-day of the commit log, written from the subjects and
// the work log; the counts beside them come from buildStats.ts.
export const buildTimelineThemes = {
  '2026-09-13-pm':
    'The whole first slice landed as one 410-file commit: schema, Edge function, corpus pipeline and evaluation harness. The same evening split the Edge function into single-unit modules, graded the deployed function against the frozen gold set twice, served the same evidence to an MCP client, and ported the Lovable design onto the real evidence contract.',
  '2026-09-14-am':
    'Revoked evidence stopped leaving prose behind and the gate was rerun. The demo went live on a Node origin with a scoped secret scan, the landing motion and full Lovable surface came back, the project got one name and newcomer documentation, and an HTTP API with request allowances arrived. The shared configs moved to the @syntopica scope, CI went green on a clean runner, and the eval gate learned to fail a system that refuses evidence it has.',
  '2026-09-14-pm':
    'A browser test walked one analyst workflow with the network cut, and the authorization rules ran as real SQL without credentials. The retrieval diagnostic record was decided, built, migrated and redeployed. The evidence-integrity plan was written, corrected where its first implementer hit defects, and delivered: passage text treated as hostile, evidence vintage on every answer, both sides of a disagreement, and a provenance action with an honest 404.',
  '2026-09-15-am':
    'Interface polish under the better-ui rules, then the workspace shell: a pinned sidebar, a held frame while access is confirmed, standards readable without leaving the workspace. Ask moved to its own route beside an evidence inspector, the library got its own route, and the pipeline was exposed as observable stages, with an ADR rejecting provisional claims and stored answers.',
  '2026-09-15-pm':
    'The answer began streaming its progress and publishing once, measured live over SSE. Pending and cancel states were settled, identifiers became chips, and dates became dates. Ask opened from a bubble on every page and became a chat; the workspace was entered by company; and follow-up questions were accepted by rewriting them before retrieval. In the evening, this page and the script that computes its figures.',
} as const satisfies Record<BuildHalfDayKey, string>
