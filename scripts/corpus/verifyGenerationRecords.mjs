import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { canonicalJson } from './canonicalJson.mjs'
import { readJson } from './readJson.mjs'
import { resolveCorpusPath } from './resolveCorpusPath.mjs'
import { sha256 } from './sha256.mjs'

export async function verifyGenerationRecords(root, manifest, authority) {
  assert.equal(manifest.generation.length, 5)
  assert.deepEqual(
    manifest.generation.map((record) => record.sourceId),
    ['S1', 'S2', 'S3', 'S4', 'S5'],
  )
  let attempts = 0
  for (const record of manifest.generation) {
    if (record.status === 'not_attempted') continue
    const disk = await readJson(
      `${root}/corpus/generated/${record.sourceId.toLowerCase()}.generation.json`,
    )
    assert.equal(canonicalJson(record), canonicalJson(disk))
    assert.equal(record.model, 'gpt-4.1-mini-2025-04-14')
    assert.equal(record.promptSha256, authority.promptSha256)
    assert.ok(record.attempts.length <= 2)
    attempts += record.attempts.length
    for (const attempt of record.attempts)
      if (attempt.rawPath)
        assert.equal(
          sha256(
            await readFile(await resolveCorpusPath(root, attempt.rawPath)),
          ),
          attempt.rawSha256,
        )
  }
  assert.ok(attempts <= 10)
  return attempts
}
