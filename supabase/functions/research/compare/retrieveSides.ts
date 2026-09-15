import type { Principal } from '../Principal.ts'
import type { CompareInput } from './CompareInput.ts'
import { retrieveSide } from './retrieveSide.ts'
import { sideKinds } from './sideKinds.ts'
import type { SidesRetrieval } from './SidesRetrieval.ts'

/** Interviews and filings retrieved separately, under one embedding. */
export async function retrieveSides(
  principal: Principal,
  input: CompareInput,
  embedding: number[] | null,
): Promise<SidesRetrieval> {
  return {
    interviews: await retrieveSide(
      principal,
      input,
      embedding,
      sideKinds.interviews,
    ),
    filings: await retrieveSide(principal, input, embedding, sideKinds.filings),
  }
}
