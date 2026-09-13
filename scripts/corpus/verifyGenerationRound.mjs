import assert from 'node:assert/strict'
import { canonicalJson } from './canonicalJson.mjs'
import { generationRound } from './generationRound.mjs'
import { readGenerationRound } from './readGenerationRound.mjs'
import { sha256 } from './sha256.mjs'
import { verifyRegenerationAttempt } from './verifyRegenerationAttempt.mjs'

export async function verifyGenerationRound(root, manifest, core) {
  const round = manifest.regeneration
  assert.deepEqual(round, await readGenerationRound(root, core))
  assert.equal(round.maxAttempts, generationRound.maxAttempts)
  assert.equal(round.maxAttemptsPerSource, generationRound.maxAttemptsPerSource)
  assert.deepEqual(
    round.records.map((record) => record.sourceId),
    generationRound.sourceIds,
  )
  let attempts = 0
  for (const record of round.records) {
    const source = core.documents.find(
      (document) => document.sourceId === record.sourceId,
    )
    assert.equal(record.coreSha256, sha256(canonicalJson(source)))
    assert.equal(record.promptSha256, round.promptSha256)
    assert.equal(record.model, 'gpt-4.1-mini-2025-04-14')
    assert.equal(record.synthetic, true)
    assert.equal(record.disclosure, source.disclosure)
    assert.ok(record.attempts.length <= round.maxAttemptsPerSource)
    attempts += record.attempts.length
    for (const [index, attempt] of record.attempts.entries()) {
      assert.equal(attempt.attempt, index + 1)
      await verifyRegenerationAttempt(root, attempt, source, record.model)
    }
    if (record.status === 'generated_pending_review') {
      assert.equal(record.attempts.at(-1).status, 'valid')
      assert.equal(record.selectedAttempt, record.attempts.at(-1).attempt)
      assert.equal(record.reviewStatus, 'pending_owner')
    }
  }
  assert.ok(attempts <= round.maxAttempts)
  return attempts
}
