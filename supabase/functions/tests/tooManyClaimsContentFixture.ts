/** A reply whose only schema failure is a fifth claim. */
export function tooManyClaimsContentFixture(): string {
  return JSON.stringify({
    status: 'answered',
    claims: Array.from({ length: 5 }, (_, index) => ({
      text: `Supported statement ${String(index + 1)}.`,
      sources: [1],
    })),
    missingEvidence: [],
  })
}
