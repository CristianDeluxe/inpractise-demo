import type { Principal } from '../Principal.ts'
import { investigateSubQuestion } from './investigateSubQuestion.ts'
import type { RefinementOutcome } from './RefinementOutcome.ts'
import { refinementReserve } from './refinementReserve.ts'
import { requestRefinement } from './requestRefinement.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'
import type { TokenBudget } from './TokenBudget.ts'

/**
 * Step three, bounded to one call and one retrieval. It runs only when a
 * sub-question found no readable passage and the budget can still afford both
 * the reformulation and the synthesis after it. A reformulation replaces the
 * planned question in place, keeping the original beside it.
 */
export async function refineInvestigation(
  principal: Principal,
  question: string,
  evidence: readonly SubQuestionEvidence[],
  budget: TokenBudget,
): Promise<{ outcome: RefinementOutcome; evidence?: SubQuestionEvidence }> {
  const empty = evidence
    .filter((entry) => entry.sources.length === 0)
    .map((entry) => entry.subQuestion)
  if (!empty.length) return { outcome: 'none' }
  if (!budget.canAfford(refinementReserve)) return { outcome: 'budget' }
  const refined = await requestRefinement(question, empty, budget)
  if (!refined) return { outcome: 'declined' }
  const original = empty.find((entry) => entry.index === refined.index)
  return {
    outcome: 'applied',
    evidence: await investigateSubQuestion(
      principal,
      refined,
      original?.question,
    ),
  }
}
