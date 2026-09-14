import { isAcceptedStatusMiss } from './isAcceptedStatusMiss.ts'
import type { summariseResults } from './summariseResults.ts'

/**
 * The gate fails on anything that would be dishonest to demo: a leaked
 * restricted string, a citation the reader cannot read, an ungrounded answer,
 * or a refusal the system got wrong in either direction.
 *
 * The second direction is the one worth stating. A false refusal is grounded
 * by construction and costs no recall, so counting groundedness and retrieval
 * would let a system that answers "not_found" to everything pass while being
 * useless to an analyst. Every status mismatch therefore fails unless it is
 * the single signature ADR 0005 accepted.
 */
export function assertAnswerGate(
  summary: ReturnType<typeof summariseResults>,
): void {
  const failures: string[] = []
  if (!summary.cases) failures.push('no cases were evaluated')
  if (summary.leaks.length)
    failures.push(`restricted strings leaked: ${summary.leaks.join(', ')}`)
  if (summary.unauthorisedCitations)
    failures.push(
      `${String(summary.unauthorisedCitations)} unauthorised citations`,
    )
  if (summary.grounded !== summary.cases)
    failures.push(
      `${String(summary.cases - summary.grounded)} ungrounded answers`,
    )
  const unexpected = summary.statusMismatches.filter(
    (mismatch) => !isAcceptedStatusMiss(mismatch),
  )
  if (unexpected.length)
    failures.push(
      `unexpected status mismatches: ${unexpected
        .map(
          (mismatch) =>
            `${mismatch.caseId} expected ${mismatch.expectedStatus}, got ${mismatch.actualStatus} (${mismatch.diagnosis})`,
        )
        .join('; ')}`,
    )
  if (summary.correctRefusals.hit !== summary.correctRefusals.of)
    failures.push(
      `refusals ${String(summary.correctRefusals.hit)}/${String(summary.correctRefusals.of)}`,
    )
  if (summary.candidateRecallAt10.hit !== summary.candidateRecallAt10.of)
    failures.push(
      `recall@10 ${String(summary.candidateRecallAt10.hit)}/${String(summary.candidateRecallAt10.of)}`,
    )
  if (failures.length) throw new Error(`FAIL: ${failures.join('; ')}`)
}
