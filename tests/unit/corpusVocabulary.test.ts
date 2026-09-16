import { describe, expect, it } from 'vitest'
import { CorpusDocumentSchema } from '../../scripts/db/CorpusDocumentSchema.ts'
import { loadCorpus } from '../../scripts/db/loadCorpus.ts'
import { loadManifestEntry } from '../../scripts/db/loadManifestEntry.ts'

describe('accepted corpus database vocabulary', () => {
  it('loads all eleven accepted sources with matching origin and kind', () => {
    const documents = loadCorpus()
    expect(documents).toHaveLength(11)
    expect(
      documents.filter((document) => document.origin === 'public'),
    ).toHaveLength(5)
    const publicKinds = ['sec_filing', 'annual_report_pdf']
    for (const document of documents) {
      const manifest = loadManifestEntry(document.documentId)
      const expectedKinds =
        document.origin === 'public' ? publicKinds : ['synthetic_interview']
      expect(expectedKinds).toContain(document.kind)
      expect(manifest['kind']).toBe(document.kind)
      expect(manifest['origin']).toBe(document.origin)
      expect(manifest).not.toHaveProperty('sourceKind')
    }
  })

  it('rejects a filing kind used as an origin at the database import boundary', () => {
    for (const document of loadCorpus().filter(
      (item) => item.kind === 'sec_filing' || item.kind === 'annual_report_pdf',
    ))
      expect(
        CorpusDocumentSchema.safeParse({ ...document, origin: document.kind })
          .success,
      ).toBe(false)
  })
})
