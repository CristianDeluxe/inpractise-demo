import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { loadCorpus } from '../../scripts/db/loadCorpus.ts'
import { loadManifestEntry } from '../../scripts/db/loadManifestEntry.ts'
import { requireValue } from '../assertions/requireValue.ts'
import { asPrincipal } from '../database/asPrincipal.ts'
import { fixtureManifest } from '../database/fixtureManifest.ts'
import { reviseFixture } from '../database/reviseFixture.ts'
import { seedTransactionPrincipal } from '../database/seedTransactionPrincipal.ts'
import { stageFixture } from '../database/stageFixture.ts'
import { withRollback } from '../database/withRollback.ts'

describe('atomic publication and retained revisions', () => {
  it(
    'failed replacement preserves current source; complete replacement retains old citations',
    async () =>
      withRollback(async (sql) => {
        const source = loadCorpus().find((d) => d.documentId === 's5')
        if (!source) throw new Error('Missing S5')
        const manifest = loadManifestEntry('s5')
        const id = `test-${randomUUID()}`
        const first = reviseFixture(source, id)
        const second = reviseFixture(
          source,
          id,
          'The corrected fictional January 2026 example has processing revenue of USD 100,000 on 2,000,000 transactions.',
        )
        const firstManifest = fixtureManifest(first, manifest)
        const secondManifest = fixtureManifest(second, manifest)
        await stageFixture(sql, first, firstManifest)
        expect(
          requireValue(
            (
              await sql`select public.publish_document('org-a',${id},${first.revisionId},${first.passages.length},${firstManifest.normalisedSha256}) as outcome`
            )[0],
          )['outcome'],
        ).toBe('published')
        await stageFixture(sql, second, secondManifest, 1)
        await expect(
          sql.savepoint(async (tx) => {
            await tx`select public.publish_document('org-a',${id},${second.revisionId},${second.passages.length},${secondManifest.normalisedSha256})`
          }),
        ).rejects.toMatchObject({ message: 'Publication validation failed' })
        expect(
          requireValue(
            (
              await sql`select revision_id from public.document_revisions where document_id=${id} and is_current`
            )[0],
          )['revision_id'],
        ).toBe(first.revisionId)
        for (const p of second.passages.slice(1))
          await sql`insert into public.passages(org_id,document_id,revision_id,passage_id,ordinal,section,speaker,speaker_role,text_content,token_count,embedding_model) values('org-a',${id},${second.revisionId},${p.passageId},${p.ordinal},${p.section},${p.speaker},${p.speakerRole},${p.text},${p.tokenCount + p.metadataTokenCount},'text-embedding-3-small')`
        await sql`select public.publish_document('org-a',${id},${second.revisionId},${second.passages.length},${secondManifest.normalisedSha256})`
        expect(
          requireValue(
            (
              await sql`select public.publish_document('org-a',${id},${second.revisionId},${second.passages.length},${secondManifest.normalisedSha256}) as outcome`
            )[0],
          )['outcome'],
        ).toBe('unchanged')
        const user = await seedTransactionPrincipal(sql, 'org-a')
        await asPrincipal(sql, user)
        expect(
          requireValue(
            (
              await sql`select text_content from public.passages where document_id=${id} and revision_id=${first.revisionId} and passage_id='P2'`
            )[0],
          )['text_content'],
        ).toContain('120,000')
        expect(
          requireValue(
            (
              await sql`select text_content from public.passages where document_id=${id} and revision_id=${second.revisionId} and passage_id='P2'`
            )[0],
          )['text_content'],
        ).toContain('100,000')
        const candidates =
          await sql`select * from public.search_candidates('corrected fictional January',null,null,30) where document_id=${id}`
        expect(candidates.length).toBeGreaterThan(0)
        expect(
          candidates.every((c) => c['revision_id'] === second.revisionId),
        ).toBe(true)
      }),
    60000,
  )
  it(
    'rejects wrong manifest hash and member publication authority',
    async () =>
      withRollback(async (sql) => {
        const source = requireValue(loadCorpus()[0])
        const manifest = loadManifestEntry(source.documentId)
        const document = reviseFixture(source, `test-${randomUUID()}`)
        await stageFixture(sql, document, fixtureManifest(document, manifest))
        await expect(
          sql.savepoint(async (tx) => {
            await tx`select public.publish_document('org-a',${document.documentId},${document.revisionId},${document.passages.length},${'0'.repeat(64)})`
          }),
        ).rejects.toMatchObject({ message: 'Publication validation failed' })
        const user = await seedTransactionPrincipal(sql, 'org-a')
        await asPrincipal(sql, user)
        expect(
          requireValue(
            (
              await sql`select has_function_privilege(current_user,'public.publish_document(text,text,text,integer,text)','execute') as allowed`
            )[0],
          )['allowed'],
        ).toBe(false)
      }),
    60000,
  )
  it(
    'rejects persisted metadata that differs from canonical revision content',
    async () =>
      withRollback(async (sql) => {
        const source = requireValue(loadCorpus()[0])
        const document = reviseFixture(source, `test-${randomUUID()}`)
        const manifest = fixtureManifest(
          document,
          loadManifestEntry(source.documentId),
        )
        await stageFixture(sql, document, manifest)
        await sql`update public.document_revisions set title='Altered staged title' where document_id=${document.documentId}`
        await expect(
          sql.savepoint(async (tx) => {
            await tx`select public.publish_document('org-a',${document.documentId},${document.revisionId},${document.passages.length},${manifest.normalisedSha256})`
          }),
        ).rejects.toMatchObject({ message: 'Publication validation failed' })
        expect(
          requireValue(
            (
              await sql`select published from public.document_revisions where document_id=${document.documentId}`
            )[0],
          )['published'],
        ).toBe(false)
      }),
    60000,
  )
})
