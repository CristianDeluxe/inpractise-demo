import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'
import type { PassageRef } from './PassageRef.ts'

/** Ids only: the reader asks for each neighbour explicitly to see its text. */
export async function readNeighbourIds(
  principal: Principal,
  ref: PassageRef,
  ordinal: number,
): Promise<string[]> {
  const neighbours = await principal.client
    .from('passages')
    .select('passage_id,ordinal')
    .eq('org_id', principal.orgId)
    .eq('document_id', ref.documentId)
    .eq('revision_id', ref.revisionId)
    .gte('ordinal', ordinal - 1)
    .lte('ordinal', ordinal + 1)
    .order('ordinal')
  if (neighbours.error)
    throw new ApiError('dependency_failure', 'Neighbour read failed', true)
  return neighbours.data
    .filter((row) => row.passage_id !== ref.passageId)
    .map((row) => row.passage_id)
}
