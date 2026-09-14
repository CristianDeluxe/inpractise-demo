export function providerContentFixture(
  claim: unknown = { text: 'A supported statement.', sources: [1] },
  status = 'answered',
) {
  return JSON.stringify({ status, claims: [claim], missingEvidence: [] })
}
