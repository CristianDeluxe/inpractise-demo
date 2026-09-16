import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { assertApprovedReviewedDocument } from './assertApprovedReviewedDocument.mjs'
import { assertSecUrl } from './assertSecUrl.mjs'
import { canonicalJson } from './canonicalJson.mjs'
import { parseSecNarrative } from './parseSecNarrative.mjs'

export async function verifyPublicDocument(root, entry, document) {
  assertSecUrl(entry.sourceUrl)
  assert.equal(entry.origin, 'public')
  assert.equal(entry.kind, 'sec_filing')
  assert.equal(Object.hasOwn(entry, 'sourceKind'), false)
  assert.equal(entry.synthetic, false)
  assert.equal(entry.fictional, false)
  assert.match(entry.disclosure, /^SEC filing/)
  assert.ok(!/synthetic/i.test(entry.disclosure))
  assert.equal(
    entry.rights.policyUrl,
    'https://www.sec.gov/about/webmaster-frequently-asked-questions',
  )
  assert.ok(Number.isFinite(Date.parse(entry.retrievedAt)))
  assert.equal(entry.form, '10-K')
  assert.match(entry.accession, /^\d{10}-\d{2}-\d{6}$/)
  assert.equal(entry.reviewStatus, 'approved')
  assert.ok(Number.isFinite(Date.parse(entry.reviewedAt)))
  await assertApprovedReviewedDocument(root, entry, document)
  assert.equal(
    canonicalJson(document.sourceTurns),
    canonicalJson(
      parseSecNarrative(await readFile(`${root}/${entry.rawPath}`, 'utf8'))
        .turns,
    ),
  )
}
