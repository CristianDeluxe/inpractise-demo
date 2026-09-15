import { buildCitation } from '../citations/buildCitation.ts'
import type { Principal } from '../Principal.ts'
import type { PassageRef } from './PassageRef.ts'
import { readPassageRow } from './readPassageRow.ts'
import { readRevisionRow } from './readRevisionRow.ts'

/**
 * One passage as a citation, read twice under the caller: the passage row and
 * the revision that carries its provenance. Either read failing closed is a
 * not_found, so a caller learns nothing about evidence they cannot open.
 */
export async function readPassageCitation(
  principal: Principal,
  ref: PassageRef,
) {
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
    ordinal: passage.ordinal,
    isCurrentRevision: revision.is_current,
  }
}
