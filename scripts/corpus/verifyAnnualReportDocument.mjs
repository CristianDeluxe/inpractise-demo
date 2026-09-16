import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { assertHttpsUrl } from './assertHttpsUrl.mjs'
import { canonicalJson } from './canonicalJson.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { parseAnnualReportNarrative } from './parseAnnualReportNarrative.mjs'
import { readJson } from './readJson.mjs'
import { sha256 } from './sha256.mjs'

export async function verifyAnnualReportDocument(root, entry, document) {
  assertHttpsUrl(entry.sourceUrl)
  assert.equal(entry.origin, 'public')
  assert.equal(entry.kind, 'annual_report_pdf')
  assert.equal(entry.synthetic, false)
  assert.equal(entry.fictional, false)
  assert.match(entry.disclosure, /^Annual report/)
  assert.ok(!/synthetic/i.test(entry.disclosure))
  assert.ok(entry.jurisdiction)
  assert.ok(entry.reportingPeriod?.start && entry.reportingPeriod?.end)
  assert.ok(Number.isFinite(Date.parse(entry.retrievedAt)))
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
  const bytes = await readFile(`${root}/${entry.rawPath}`)
  assert.equal(sha256(bytes), entry.rawSha256)
  assert.equal(
    canonicalJson(document.sourceTurns),
    canonicalJson((await parseAnnualReportNarrative(bytes)).turns),
  )
}
