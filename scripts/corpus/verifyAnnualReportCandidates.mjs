import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { canonicalJson } from './canonicalJson.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { parseAnnualReportNarrative } from './parseAnnualReportNarrative.mjs'
import { readJson } from './readJson.mjs'
import { resolveCorpusPath } from './resolveCorpusPath.mjs'
import { sha256 } from './sha256.mjs'

export async function verifyAnnualReportCandidates(root) {
  const reviews = await readJson(`${root}/corpus/review/annual-reports.json`)
  let candidatePassages = 0
  let candidates = 0
  for (const candidate of reviews.documents) {
    if (candidate.status !== 'parsed_pending_review') continue
    candidates += 1
    const document = await readJson(
      await resolveCorpusPath(root, candidate.normalisedPath),
    )
    assert.equal(
      sha256(await readFile(`${root}/${candidate.normalisedPath}`)),
      candidate.normalisedSha256,
    )
    const bytes = await readFile(
      await resolveCorpusPath(root, candidate.rawPath),
    )
    assert.equal(sha256(bytes), candidate.rawSha256)
    const parsed = await parseAnnualReportNarrative(bytes)
    assert.equal(
      canonicalJson(document.sourceTurns),
      canonicalJson(parsed.turns),
      'ANNUAL_REPORT_RAW_TO_PASSAGE_REPLAY',
    )
    assert.equal(
      canonicalJson(candidate.coverage),
      canonicalJson(parsed.coverage),
    )
    assert.equal(
      canonicalJson(document),
      canonicalJson(normaliseDocument(document, parsed.turns)),
    )
    assert.equal(document.revisionId, candidate.revisionId)
    assert.equal(document.passages.length, candidate.passageCount)
    candidatePassages += candidate.passageCount
  }
  return { reviews, candidates, candidatePassages }
}
