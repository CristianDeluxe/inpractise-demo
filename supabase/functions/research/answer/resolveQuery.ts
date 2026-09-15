import type { AskHistoryTurn } from './AskHistoryTurn.ts'
import { parseCondensedQuery } from './parseCondensedQuery.ts'
import { requestCondensation } from './requestCondensation.ts'

/**
 * The question retrieval and generation actually run on. A question with no
 * earlier turns is used as written and costs no provider call; a follow-up is
 * rewritten first, and the rewrite is what the caller sees cited.
 */
export async function resolveQuery(
  query: string,
  history: readonly AskHistoryTurn[],
): Promise<string> {
  if (history.length === 0) return query
  return parseCondensedQuery(await requestCondensation(query, history))
}
