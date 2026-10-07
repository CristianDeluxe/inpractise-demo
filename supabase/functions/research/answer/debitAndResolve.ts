import type { Principal } from '../Principal.ts'
import type { AskHistoryTurn } from './AskHistoryTurn.ts'
import type { DebitedQuery } from './DebitedQuery.ts'
import { debitRequest } from './debitRequest.ts'
import { resolveQuery } from './resolveQuery.ts'

/**
 * Debit the caller's allowance before starting a follow-up rewrite: the
 * rewrite is a provider call, and an exhausted allowance permits none.
 */
export async function debitAndResolve(
  principal: Principal,
  query: string,
  history: readonly AskHistoryTurn[],
): Promise<DebitedQuery> {
  const request = await debitRequest(principal)
  const resolvedQuery = await resolveQuery(query, history)
  return { request, resolvedQuery }
}
