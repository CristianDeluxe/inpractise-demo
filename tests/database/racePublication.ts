import type { CorpusDocument } from '../../scripts/db/CorpusDocument.ts'
import { loadManifestEntry } from '../../scripts/db/loadManifestEntry.ts'
import { fixtureManifest } from './fixtureManifest.ts'
import type { PublicationBarrier } from './PublicationBarrier.ts'
import { stageFixture } from './stageFixture.ts'
import { withRollback } from './withRollback.ts'

export async function racePublication(
  document: CorpusDocument,
  barrier: PublicationBarrier,
) {
  const manifest = fixtureManifest(
    document,
    loadManifestEntry(document.documentId),
  )
  let outcome: unknown
  await withRollback(async (sql) => {
    await sql`set local statement_timeout='15s'`
    await stageFixture(sql, document, manifest)
    barrier.arrive()
    await barrier.ready
    const result =
      await sql`select public.publish_document('org-a',${document.documentId},${document.revisionId},${document.passages.length},${manifest.normalisedSha256}) as outcome`
    const current =
      await sql`select revision_id,published,private.validate_canonical_revision(r) as valid from public.document_revisions r where org_id='org-a' and document_id=${document.documentId} and is_current`
    outcome = { result: String(result[0]?.['outcome']), current: [...current] }
  })
  return outcome
}
