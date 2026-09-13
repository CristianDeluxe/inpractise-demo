import { buildCitation } from '../citations/buildCitation.ts'
import type { PassageRef } from '../passages/PassageRef.ts'
import { readNeighbourIds } from '../passages/readNeighbourIds.ts'
import { readPassageRow } from '../passages/readPassageRow.ts'
import { readRevisionRow } from '../passages/readRevisionRow.ts'
import type { Principal } from '../Principal.ts'

/**
 * Returns one passage plus its neighbours' IDs only. An unauthorised passage is
 * a plain 404 with no title hint, so the endpoint cannot be used to enumerate.
 */
export async function handleRead(principal: Principal, ref: PassageRef) {
  const passage = await readPassageRow(principal, ref)
  const revision = await readRevisionRow(principal, ref)
  return {
    citation: buildCitation({
      ...ref,
      text: passage.text_content,
      title: revision.title,
      company: revision.company,
      origin: revision.origin,
      kind: revision.kind,
      speaker: passage.speaker,
      speakerRole: passage.speaker_role,
      interviewDate: revision.interview_date,
      publishedAt: revision.published_at,
      sourceUrl: revision.source_url,
    }),
    section: passage.section,
    isCurrentRevision: revision.is_current,
    neighbourIds: await readNeighbourIds(principal, ref, passage.ordinal),
  }
}
