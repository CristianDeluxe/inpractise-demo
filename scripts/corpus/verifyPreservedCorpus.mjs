import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { assertRuntime } from './assertRuntime.mjs'
import { readJson } from './readJson.mjs'
import { sha256 } from './sha256.mjs'

try {
  const root = await assertRuntime()
  const before = await readJson(
    `${root}/corpus/generated/briefing-i/before-hashes.json`,
  )
  const protectedPaths = Object.keys(before).filter(
    (path) =>
      (path.startsWith('corpus/') && path !== 'corpus/manifest.json') ||
      path.startsWith('scripts/corpus/validators/'),
  )
  for (const path of protectedPaths)
    assert.equal(
      sha256(await readFile(`${root}/${path}`)),
      before[path],
      'PRESERVED_CORPUS_HASH',
    )
  const manifest = await readJson(`${root}/corpus/manifest.json`)
  for (const entry of manifest.documents.filter(
    (item) => item.origin === 'public',
  ))
    assert.equal(
      sha256(await readFile(`${root}/${entry.normalisedPath}`)),
      entry.reviewedNormalisedSha256,
      'APPROVED_PUBLIC_CORPUS_HASH',
    )
  console.log(
    `PASS: ${protectedPaths.length} original corpus and validation files remain byte-identical; manifest additions are excluded; accepted public files match reviewed hashes.`,
  )
} catch {
  console.error('FAIL: ORIGINAL_CORPUS_CHANGED')
  process.exitCode = 1
}
