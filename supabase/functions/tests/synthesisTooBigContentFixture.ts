/** A scripted synthesis reply whose claim text exceeds the 500-character cap,
 * used to prove the one bounded retry when every failure is too_big. */
export function synthesisTooBigContentFixture(
  subQuestions: readonly { index: number; status: string }[],
) {
  return JSON.stringify({
    status: 'answered',
    claims: [{ text: 'x'.repeat(501), sources: [1] }],
    missingEvidence: [],
    subQuestions,
  })
}
