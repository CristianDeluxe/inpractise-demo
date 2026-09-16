import { assertRuntime } from './assertRuntime.mjs'
import { buildCorpus } from './buildCorpus.mjs'
import { readExpectedCounts } from './readExpectedCounts.mjs'

try {
  const root = await assertRuntime()
  if (process.argv.slice(2).some((argument) => argument !== '--synthetic-only'))
    throw new Error('UNKNOWN_BUILD_ARGUMENT')
  const manifest = await buildCorpus(
    root,
    process.argv.includes('--synthetic-only'),
  )
  const counts = await readExpectedCounts(root)
  if (
    !process.argv.includes('--synthetic-only') &&
    manifest.publicDocumentCount !== counts.publicSelectorCount
  ) {
    console.error(
      'PUBLIC_INTAKE_NOT_ACCEPTED: use --synthetic-only for the explicit fallback.',
    )
    process.exitCode = 1
  }
} catch {
  console.error('CORPUS_BUILD_FAILED')
  process.exitCode = 1
}
