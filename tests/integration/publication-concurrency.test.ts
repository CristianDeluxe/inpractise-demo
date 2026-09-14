import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { loadCorpus } from '../../scripts/db/loadCorpus.ts'
import { requireValue } from '../assertions/requireValue.ts'
import { createPublicationBarrier } from '../database/createPublicationBarrier.ts'
import { racePublication } from '../database/racePublication.ts'
import { reviseFixture } from '../database/reviseFixture.ts'
import { withRollback } from '../database/withRollback.ts'

describe('competing publication transactions', () => {
  it('aborts a lock-upgrade race without interleaving current evidence', async () => {
    const source = requireValue(
      loadCorpus().find((document) => document.documentId === 's5'),
    )
    const first = reviseFixture(
      source,
      source.documentId,
      `First concurrent revision ${randomUUID()}`,
    )
    const second = reviseFixture(
      source,
      source.documentId,
      `Second concurrent revision ${randomUUID()}`,
    )
    let before: unknown
    await withRollback(async (sql) => {
      before = [
        ...(await sql`select * from public.document_revisions where org_id='org-a' and document_id=${source.documentId} order by revision_id`),
      ]
    })
    const barrier = createPublicationBarrier()
    const results = await Promise.allSettled([
      racePublication(first, barrier),
      racePublication(second, barrier),
    ])
    barrier.cancel()
    const successful = results.filter((result) => result.status === 'fulfilled')
    const aborted = results.filter((result) => result.status === 'rejected')
    expect(successful).toHaveLength(1)
    expect(aborted).toHaveLength(1)
    expect(aborted[0]?.reason).toMatchObject({ code: '40P01' })
    const winner = results[0].status === 'fulfilled' ? first : second
    expect(successful[0]?.value).toEqual({
      result: 'published',
      current: [
        { revision_id: winner.revisionId, published: true, valid: true },
      ],
    })
    await withRollback(async (sql) => {
      expect([
        ...(await sql`select * from public.document_revisions where org_id='org-a' and document_id=${source.documentId} order by revision_id`),
      ]).toEqual(before)
      expect(
        await sql`select passage_id from public.passages where org_id='org-a' and document_id=${source.documentId} and revision_id in (${first.revisionId},${second.revisionId})`,
      ).toHaveLength(0)
    })
  }, 60000)
})
