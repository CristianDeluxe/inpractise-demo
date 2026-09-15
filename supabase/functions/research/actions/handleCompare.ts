import type { CompareInput } from '../compare/CompareInput.ts'
import type { Principal } from '../Principal.ts'
import { compareStages } from './compareStages.ts'

/**
 * Drains the staged pipeline and returns only its terminal value, which is the
 * non-streaming contract: one validated envelope, after the recheck.
 */
export async function handleCompare(principal: Principal, input: CompareInput) {
  const stages = compareStages(principal, input)
  let step = await stages.next()
  while (!step.done) step = await stages.next()
  return step.value
}
