import type { AskRequest } from '@/api/AskRequest'
import type { AskExchange } from '@/research/AskExchange'
import { historyFromExchanges } from '@/research/historyFromExchanges'

/** Omits the company key when the scope is every company, and the history key
 * when there is none, rather than sending empty values the server would have to
 * interpret. */
export function askRequestFor(
  query: string,
  company: string,
  exchanges: readonly AskExchange[] = [],
): AskRequest {
  const history = historyFromExchanges(exchanges)
  return {
    action: 'ask',
    query,
    ...(company ? { company } : {}),
    ...(history.length ? { history } : {}),
  }
}
