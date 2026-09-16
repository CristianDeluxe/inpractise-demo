import assert from 'node:assert/strict'
import { canonicalJson } from './canonicalJson.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'

/**
 * Asserts that a review candidate's normalised document is a faithful,
 * revision-stable replay of its parsed source, shared by the SEC and
 * annual-report candidate-verification scripts.
 */
export function assertReviewCandidateReplay(document, candidate, parsed) {
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
}
