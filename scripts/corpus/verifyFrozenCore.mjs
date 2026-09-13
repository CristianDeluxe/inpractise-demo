import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { readJson } from './readJson.mjs'
import { sha256 } from './sha256.mjs'

export async function verifyFrozenCore(root, authority) {
  assert.equal(
    sha256(await readFile(`${root}/corpus/core.json`)),
    authority.coreSha256,
    'FROZEN_CORE_HASH',
  )
  assert.equal(
    sha256(await readFile(`${root}/corpus/generation-prompt.txt`)),
    authority.promptSha256,
    'FROZEN_PROMPT_HASH',
  )
  const core = await readJson(`${root}/corpus/core.json`)
  assert.equal(core.documents.length, 6)
  assert.deepEqual(
    core.documents.map((document) => document.sourceId),
    ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
  )
  assert.equal(Object.keys(authority.paragraphHashes).length, 24)
  return core
}
