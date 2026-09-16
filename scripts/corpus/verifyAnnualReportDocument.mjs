import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { assertApprovedReviewedDocument } from './assertApprovedReviewedDocument.mjs'
import { assertHttpsUrl } from './assertHttpsUrl.mjs'
import { canonicalJson } from './canonicalJson.mjs'
import { parseAnnualReportNarrative } from './parseAnnualReportNarrative.mjs'
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
  await assertApprovedReviewedDocument(root, entry, document)
  const bytes = await readFile(`${root}/${entry.rawPath}`)
  assert.equal(sha256(bytes), entry.rawSha256)
  assert.equal(
    canonicalJson(document.sourceTurns),
    canonicalJson((await parseAnnualReportNarrative(bytes)).turns),
  )
}
