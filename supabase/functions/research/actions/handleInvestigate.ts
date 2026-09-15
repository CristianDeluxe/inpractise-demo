import type { Principal } from '../Principal.ts'
import { investigateStages } from './investigateStages.ts'

/**
 * Drains the staged loop and returns only its terminal value, which is the
 * non-streaming contract: one validated envelope, after the recheck.
 */
export async function handleInvestigate(
  principal: Principal,
  question: string,
  company: string | undefined,
) {
  const stages = investigateStages(principal, question, company)
  let step = await stages.next()
  while (!step.done) step = await stages.next()
  return step.value
}
