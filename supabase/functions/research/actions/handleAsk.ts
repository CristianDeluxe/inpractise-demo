import type { Principal } from '../Principal.ts'
import { askStages } from './askStages.ts'

/**
 * Drains the staged pipeline and returns only its terminal value, which is the
 * non-streaming contract: one validated envelope, after the recheck.
 */
export async function handleAsk(
  principal: Principal,
  query: string,
  company: string | undefined,
) {
  const stages = askStages(principal, query, company)
  let step = await stages.next()
  while (!step.done) step = await stages.next()
  return step.value
}
