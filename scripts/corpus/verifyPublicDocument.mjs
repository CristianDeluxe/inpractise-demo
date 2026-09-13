import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { assertSecUrl } from './assertSecUrl.mjs'
import { canonicalJson } from './canonicalJson.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { parseSecNarrative } from './parseSecNarrative.mjs'
import { readJson } from './readJson.mjs'
import { sha256 } from './sha256.mjs'

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
  const approvals = await readJson(`${root}/corpus/review/approvals.json`)
  assert.ok(
    approvals.documents.some(
      (item) =>
        item.documentId === entry.documentId &&
        item.revisionId === entry.reviewedRevisionId &&
        item.normalisedSha256 === entry.reviewedNormalisedSha256 &&
        item.status === 'approved' &&
        item.reviewedBy === 'owner',
    ),
  )
  const reviewed = await readJson(`${root}/${entry.reviewedNormalisedPath}`)
  assert.equal(
    sha256(await readFile(`${root}/${entry.reviewedNormalisedPath}`)),
    entry.reviewedNormalisedSha256,
  )
  assert.equal(reviewed.revisionId, entry.reviewedRevisionId)
  assert.deepEqual(document.passages, reviewed.passages)
  assert.deepEqual(document, normaliseDocument(reviewed, reviewed.sourceTurns))
  assert.equal(
    canonicalJson(document.sourceTurns),
    canonicalJson(
      parseSecNarrative(await readFile(`${root}/${entry.rawPath}`, 'utf8'))
        .turns,
    ),
  )
}
