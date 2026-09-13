import assert from 'node:assert/strict'
import { canonicalJson } from './canonicalJson.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { verifyDocument } from './verifyDocument.mjs'

export async function verifyCorpusFixtures(root, manifest, core) {
  assert.equal(manifest.fixtures.length, 2)
  for (const fixture of manifest.fixtures) {
    const document = await verifyDocument(root, fixture)
    const source = structuredClone(
      core.documents.find((item) => item.sourceId === document.sourceId),
    )
    if (fixture.revisionLabel === 'v2') {
      source.publishedAt = '2026-09-01T09:00:00Z'
      source.turns[1].text =
        'The corrected fictional January 2026 example has processing revenue of USD 100,000 on 2,000,000 transactions.'
    } else {
      assert.equal(fixture.organizationScope, 'b')
      source.turns[1].text = source.turns[1].text.replace(
        'ORCHID-74',
        'CEDAR-29',
      )
    }
    assert.equal(
      canonicalJson(document),
      canonicalJson(normaliseDocument(source)),
      'ISOLATION_OR_REVISION_FIXTURE',
    )
  }
}
