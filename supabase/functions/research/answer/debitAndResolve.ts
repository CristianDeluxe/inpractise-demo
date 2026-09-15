import type { Principal } from '../Principal.ts'
import type { AskHistoryTurn } from './AskHistoryTurn.ts'
import { debitRequest } from './debitRequest.ts'
import { resolveQuery } from './resolveQuery.ts'

/**
 * The allowance debit authorises spend; it decides nothing about what the
 * question resolves to, so it runs alongside resolution instead of before it.
 * A follow-up rewrite still finishes before anything downstream is measured
 * on its behalf.
 */
export async function debitAndResolve(
  principal: Principal,
  query: string,
  history: readonly AskHistoryTurn[],
): Promise<{ request: string; resolvedQuery: string }> {
  const [request, resolvedQuery] = await Promise.all([
    debitRequest(principal),
    resolveQuery(query, history),
  ])
  return { request, resolvedQuery }
}
