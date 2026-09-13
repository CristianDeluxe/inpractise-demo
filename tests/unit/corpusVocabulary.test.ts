import { describe, expect, it } from 'vitest'
import { CorpusDocumentSchema } from '../../scripts/db/CorpusDocumentSchema.ts'
import { loadCorpus } from '../../scripts/db/loadCorpus.ts'
import { loadManifestEntry } from '../../scripts/db/loadManifestEntry.ts'

describe('accepted corpus database vocabulary', () => {
  it('loads all ten accepted sources with matching origin and kind', () => {
    const documents = loadCorpus()
    expect(documents).toHaveLength(10)
    expect(
      documents.filter((document) => document.origin === 'public'),
    ).toHaveLength(4)
    for (const document of documents) {
      const manifest = loadManifestEntry(document.documentId)
      expect(document.kind).toBe(
        document.origin === 'public' ? 'sec_filing' : 'synthetic_interview',
      )
      expect(manifest['kind']).toBe(document.kind)
      expect(manifest['origin']).toBe(document.origin)
      expect(manifest).not.toHaveProperty('sourceKind')
    }
  })

  it('rejects a filing kind used as an origin at the database import boundary', () => {
    for (const document of loadCorpus().filter(
      (item) => item.kind === 'sec_filing',
    ))
      expect(
        CorpusDocumentSchema.safeParse({ ...document, origin: 'sec_filing' })
          .success,
      ).toBe(false)
  })
})
