/** Knobs on the fixture cross-reference: one claim per side, the relations, and extra keys. */
export type ComparePayloadOptions = {
  interviewClaim?: Record<string, unknown>
  filingSide?: Record<string, unknown>
  relations?: unknown[]
  uncovered?: string[]
  extra?: Record<string, unknown>
}
