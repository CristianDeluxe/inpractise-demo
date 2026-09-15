/** A scripted synthesis reply: one cited claim and a status per sub-question. */
export function synthesisContentFixture(
  subQuestions: readonly { index: number; status: string }[],
  claims: unknown = [{ text: 'Both migrations were short.', sources: [1] }],
  status = 'answered',
) {
  return JSON.stringify({
    status,
    claims,
    missingEvidence: [],
    subQuestions,
  })
}
