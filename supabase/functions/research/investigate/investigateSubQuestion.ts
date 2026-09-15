import { embedQuery } from '../answer/embedQuery.ts'
import { retrieveForQuery } from '../answer/retrieveForQuery.ts'
import { selectedCandidates } from '../answer/selectedCandidates.ts'
import { readCitationSources } from '../citations/readCitationSources.ts'
import type { Principal } from '../Principal.ts'
import type { SubQuestion } from './SubQuestion.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'

/**
 * One retrieval step, exactly as a standalone ask measures it: recall before
 * context selection, selection under the same caps, and a read of the kept
 * passages with the caller's own client so an unauthorised one drops here.
 */
export async function investigateSubQuestion(
  principal: Principal,
  subQuestion: SubQuestion,
  originalQuestion?: string,
): Promise<SubQuestionEvidence> {
  const embedding = await embedQuery(subQuestion.question)
  const { candidates, diagnostics } = await retrieveForQuery(
    principal,
    subQuestion.question,
    subQuestion.company,
    embedding,
  )
  const selected = selectedCandidates(candidates, diagnostics.selectedIds)
  const sources = await readCitationSources(principal, selected)
  return {
    subQuestion,
    ...(originalQuestion === undefined ? {} : { originalQuestion }),
    mode: diagnostics.mode,
    candidates,
    selected,
    sources,
  }
}
