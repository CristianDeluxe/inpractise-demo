import type { Principal } from '../Principal.ts'
import type { TokenBudget } from './TokenBudget.ts'

/** What every phase of one investigation shares: who is asking, what they
 * asked, the ledger row already debited for it, the token budget, the
 * disclosure decision and the clock. */
export type InvestigationContext = {
  principal: Principal
  question: string
  request: string
  budget: TokenBudget
  detailed: boolean
  clock: () => number
}
