import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { readJson } from './readJson.mjs'
import { resolveCorpusPath } from './resolveCorpusPath.mjs'
import { sha256 } from './sha256.mjs'
import { validateInterview } from './validators/validateInterview.mjs'

export async function verifyRegenerationAttempt(root, attempt, source, model) {
  assert.ok(Number.isFinite(Date.parse(attempt.generatedAt)))
  assert.notEqual(attempt.status, 'started', 'UNRESOLVED_GENERATION_ATTEMPT')
  if (attempt.usage) {
    assert.ok(Number.isInteger(attempt.usage.promptTokens))
    assert.ok(Number.isInteger(attempt.usage.completionTokens))
    assert.equal(
      attempt.usage.totalTokens,
      attempt.usage.promptTokens + attempt.usage.completionTokens,
    )
  }
  if (!attempt.rawPath) return
  const path = await resolveCorpusPath(root, attempt.rawPath)
  assert.equal(sha256(await readFile(path)), attempt.rawSha256)
  if (attempt.status === 'valid') {
    assert.equal(attempt.responseModel, model)
    assert.deepEqual(
      validateInterview(await readJson(path), source),
      attempt.validation,
    )
    assert.equal(attempt.finishReason, 'stop')
  } else if (attempt.status === 'INVALID_INTERVIEW') {
    const draft = await readFile(path, 'utf8')
    assert.throws(() => validateInterview(JSON.parse(draft), source))
  }
}
