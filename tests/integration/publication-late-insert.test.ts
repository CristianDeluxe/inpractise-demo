import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { loadCorpus } from '../../scripts/db/loadCorpus.ts'
import { loadManifestEntry } from '../../scripts/db/loadManifestEntry.ts'
import { requireValue } from '../assertions/requireValue.ts'
import { fixtureManifest } from '../database/fixtureManifest.ts'
import { reviseFixture } from '../database/reviseFixture.ts'
import { stageFixture } from '../database/stageFixture.ts'
import { withRollback } from '../database/withRollback.ts'

describe('late passage insertion', () => {
  it('cannot change evidence after publication in the same transaction', async () => {
    await withRollback(async (sql) => {
      const source = requireValue(loadCorpus()[0])
      const document = reviseFixture(source, `test-${randomUUID()}`)
      const manifest = fixtureManifest(
        document,
        loadManifestEntry(source.documentId),
      )
      await stageFixture(sql, document, manifest)
      const result =
        await sql`select public.publish_document('org-a',${document.documentId},${document.revisionId},${document.passages.length},${manifest.normalisedSha256}) as outcome`
      expect(result[0]?.['outcome']).toBe('published')
      const before =
        await sql`select * from public.passages where org_id='org-a' and document_id=${document.documentId} order by ordinal`
      const revision =
        await sql`select * from public.document_revisions where org_id='org-a' and document_id=${document.documentId}`
      await expect(
        sql.savepoint(async (tx) => {
          await tx`insert into public.passages(org_id,document_id,revision_id,passage_id,ordinal,section,text_content,token_count,embedding_model) values('org-a',${document.documentId},${document.revisionId},'late',999,'Interview','Late evidence',2,'text-embedding-3-small')`
        }),
      ).rejects.toMatchObject({ message: 'Published passage is immutable' })
      expect(
        await sql`select * from public.passages where org_id='org-a' and document_id=${document.documentId} order by ordinal`,
      ).toEqual(before)
      expect(
        await sql`select * from public.document_revisions where org_id='org-a' and document_id=${document.documentId}`,
      ).toEqual(revision)
      expect(revision[0]).toMatchObject({ published: true, is_current: true })
    })
  }, 60000)
})
