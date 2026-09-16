import { retrieveCandidates } from '../../_shared/search/retrieveCandidates.ts'
import { retrievalDiagnostics } from '../answer/retrievalDiagnostics.ts'
import { selectedCandidates } from '../answer/selectedCandidates.ts'
import { readCitationSources } from '../citations/readCitationSources.ts'
import type { Principal } from '../Principal.ts'
import type { CompareInput } from './CompareInput.ts'
import { sidePassageCap } from './sidePassageCap.ts'
import type { SideRetrieval } from './SideRetrieval.ts'

/**
 * One side of the cross-reference: the same caller-scoped retrieval an answer
 * uses, narrowed to one document kind in the database, then bounded to a few
 * passages so the other side gets equal room in the same generation.
 */
export async function retrieveSide(
  principal: Principal,
  input: CompareInput,
  embedding: number[] | null,
  kind: string,
): Promise<SideRetrieval> {
  const { candidates, diagnostics } = await retrieveCandidates(
    principal.client,
    {
      premium: principal.premium,
      query: input.topic,
      embedding,
      kind,
      ...(input.company === undefined ? {} : { company: input.company }),
    },
  )
  const selected = selectedCandidates(
    candidates,
    diagnostics.selectedIds,
  ).slice(0, sidePassageCap)
  const sources = await readCitationSources(principal, selected)
  return {
    mode: diagnostics.mode,
    candidates,
    selected,
    sources,
    record: retrievalDiagnostics(candidates, selected),
  }
}
