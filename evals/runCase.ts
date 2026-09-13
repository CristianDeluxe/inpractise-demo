import type { MaxOAuthToken } from '@cristiandeluxe/max-lane'
import { signInPersona } from '../scripts/db/signInPersona.ts'
import type { Target } from '../scripts/db/Target.ts'
import { retrieveCandidates } from '../supabase/functions/_shared/search/retrieveCandidates.ts'
import { assertCitationsAuthorised } from './assertCitationsAuthorised.ts'
import type { CaseResult } from './CaseResult.ts'
import { checkForbiddenStrings } from './checkForbiddenStrings.ts'
import { diagnoseRetrieval } from './diagnoseRetrieval.ts'
import { embedQuestion } from './embedQuestion.ts'
import type { GoldCase } from './GoldCase.ts'
import { judgeAnswer } from './judgeAnswer.ts'
import { resolveGoldIds } from './resolveGoldIds.ts'
import { runAsk } from './runAsk.ts'

/**
 * Retrieval is measured with the persona's own client before the endpoint is
 * asked anything, so recall at ten is a property of retrieval rather than of
 * whatever the generator happened to cite.
 */
export async function runCase(
  target: Target,
  tokens: readonly MaxOAuthToken[],
  goldCase: GoldCase,
): Promise<CaseResult> {
  const { client, token } = await signInPersona(target, goldCase.persona)
  const goldKeys = await resolveGoldIds(client, goldCase.goldIds)
  const retrieval = await retrieveCandidates(client, {
    query: goldCase.question,
    embedding: await embedQuestion(goldCase.question, target.openaiKey),
    company: goldCase.company,
  })
  const result = await runAsk(
    target,
    token,
    goldCase.question,
    goldCase.company,
  )
  const retrieved = diagnoseRetrieval(
    goldKeys,
    retrieval.diagnostics.candidateAt10,
    retrieval.diagnostics.selectedIds,
  )
  return {
    caseId: goldCase.caseId,
    persona: goldCase.persona,
    expectedStatus: goldCase.expectedStatus,
    actualStatus: result.status,
    statusMatched: result.status === goldCase.expectedStatus,
    goldRecallAt10: retrieved.recallAt10,
    goldInContext: retrieved.inContext,
    diagnosis: retrieved.diagnosis,
    citationsAllAuthorised: await assertCitationsAuthorised(client, result),
    forbiddenStringsLeaked: checkForbiddenStrings(
      result,
      goldCase.mustNotContain,
    ),
    candidateCount: result.candidateCount,
    verdict: await judgeAnswer(tokens, goldCase.question, result),
  }
}
