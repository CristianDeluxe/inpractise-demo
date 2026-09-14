import type { CorpusDocument } from '../../scripts/db/CorpusDocument.ts'
import { loadManifestEntry } from '../../scripts/db/loadManifestEntry.ts'
import { fixtureManifest } from './fixtureManifest.ts'
import type { ParentLockHooks } from './ParentLockHooks.ts'
import { stageFixture } from './stageFixture.ts'
import { withRollback } from './withRollback.ts'

// The publisher that takes the document row's exclusive lock before it stages
// anything. Staging first is what deadlocks: both transactions end up holding a
// foreign-key key-share lock on the same document and then ask to upgrade it.
// Taking the stronger lock first turns the race into a queue, so the loser waits
// instead of being aborted with 40P01. Returns how long it waited for the lock,
// which is the only evidence that the second caller really queued.
export async function publishWithParentLock(
  document: CorpusDocument,
  hooks: ParentLockHooks,
): Promise<number> {
  const manifest = fixtureManifest(
    document,
    loadManifestEntry(document.documentId),
  )
  let waited = 0
  await withRollback(async (sql) => {
    await sql`set local statement_timeout='15s'`
    const start = Date.now()
    await sql`select document_id from public.documents where org_id='org-a' and document_id=${document.documentId} for update`
    waited = Date.now() - start
    hooks.onLocked?.()
    await hooks.hold
    await stageFixture(sql, document, manifest)
    await sql`select public.publish_document('org-a',${document.documentId},${document.revisionId},${document.passages.length},${manifest.normalisedSha256}) as outcome`
  })
  return waited
}
