import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { assertReviewCandidateReplay } from './assertReviewCandidateReplay.mjs'
import { canonicalJson } from './canonicalJson.mjs'
import { parseSecNarrative } from './parseSecNarrative.mjs'
import { readJson } from './readJson.mjs'
import { resolveCorpusPath } from './resolveCorpusPath.mjs'
import { sha256 } from './sha256.mjs'

export async function verifyReviewCandidates(root) {
  const reviews = await readJson(`${root}/corpus/review/sec.json`)
  let candidatePassages = 0
  for (const candidate of reviews.documents) {
    if (candidate.status !== 'parsed_pending_review') continue
    const document = await readJson(
      await resolveCorpusPath(root, candidate.normalisedPath),
    )
    assert.equal(
      sha256(await readFile(`${root}/${candidate.normalisedPath}`)),
      candidate.normalisedSha256,
    )
    const parsed = parseSecNarrative(
      await readFile(await resolveCorpusPath(root, candidate.rawPath), 'utf8'),
    )
    assert.equal(
      sha256(await readFile(`${root}/${candidate.rawPath}`)),
      candidate.rawSha256,
    )
    assert.equal(
      canonicalJson(document.sourceTurns),
      canonicalJson(parsed.turns),
      'PUBLIC_RAW_TO_PASSAGE_REPLAY',
    )
    assertReviewCandidateReplay(document, candidate, parsed)
    candidatePassages += candidate.passageCount
  }
  assert.ok(
    reviews.documents.reduce(
      (sum, entry) => sum + (entry.totalTokens ?? 0),
      0,
    ) <= 80000,
  )
  return { reviews, candidatePassages }
}
