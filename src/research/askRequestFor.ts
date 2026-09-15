import type { AskRequest } from '@/api/AskRequest'

/** Omits the company key entirely when the scope is every company, rather than
 * sending an empty filter the server would have to interpret. */
export function askRequestFor(query: string, company: string): AskRequest {
  return company ? { action: 'ask', query, company } : { action: 'ask', query }
}
