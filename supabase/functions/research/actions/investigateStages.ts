import { debitRequest } from '../answer/debitRequest.ts'
import { mayReadDiagnostics } from '../answer/mayReadDiagnostics.ts'
import type { InvestigateStage } from '../investigate/InvestigateStage.ts'
import { investigateTokenBudget } from '../investigate/investigateTokenBudget.ts'
import { planInvestigation } from '../investigate/planInvestigation.ts'
import { retrievalPhases } from '../investigate/retrievalPhases.ts'
import { startClock } from '../investigate/startClock.ts'
import { synthesisPhase } from '../investigate/synthesisPhase.ts'
import { TokenBudget } from '../investigate/TokenBudget.ts'
import type { Principal } from '../Principal.ts'

/**
 * The bounded research loop as observable phases: one debit, a plan of at
 * most four sub-questions, one retrieval per sub-question measured exactly as
 * a standalone ask measures it, at most one refinement, one synthesis under
 * the grounded-claim contract, and the authorization recheck before the only
 * value that carries evidence. Every provider call is charged against one
 * token budget; usage is recorded once, with the synthesis, because the
 * ledger accepts one total per request.
 */
export async function* investigateStages(
  principal: Principal,
  question: string,
  company: string | undefined,
) {
  const clock = startClock()
  const budget = new TokenBudget(investigateTokenBudget())
  const request = await debitRequest(principal)
  yield { phase: 'debited', elapsedMs: clock() } as InvestigateStage
  const context = {
    principal,
    question,
    request,
    budget,
    detailed: mayReadDiagnostics(principal),
    clock,
  }
  const plan = await planInvestigation(principal, question, company, budget)
  yield {
    phase: 'plan',
    elapsedMs: clock(),
    subQuestions: plan,
  } as InvestigateStage
  const gathered = yield* retrievalPhases(context, plan)
  return yield* synthesisPhase(context, plan, gathered)
}
