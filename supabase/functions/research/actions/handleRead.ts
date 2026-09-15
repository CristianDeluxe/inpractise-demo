import type { PassageRef } from '../passages/PassageRef.ts'
import { readNeighbourIds } from '../passages/readNeighbourIds.ts'
import { readPassageCitation } from '../passages/readPassageCitation.ts'
import type { Principal } from '../Principal.ts'

/**
 * Returns one passage plus its neighbours' IDs only. An unauthorised passage is
 * a plain 404 with no title hint, so the endpoint cannot be used to enumerate.
 */
export async function handleRead(principal: Principal, ref: PassageRef) {
  const read = await readPassageCitation(principal, ref)
  return {
    citation: read.citation,
    section: read.section,
    isCurrentRevision: read.isCurrentRevision,
    neighbourIds: await readNeighbourIds(principal, ref, read.ordinal),
  }
}
