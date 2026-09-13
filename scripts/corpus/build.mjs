import { assertRuntime } from './assertRuntime.mjs'
import { buildCorpus } from './buildCorpus.mjs'

try {
  const root = await assertRuntime()
  if (process.argv.slice(2).some((argument) => argument !== '--synthetic-only'))
    throw new Error('UNKNOWN_BUILD_ARGUMENT')
  const manifest = await buildCorpus(
    root,
    process.argv.includes('--synthetic-only'),
  )
  if (
    !process.argv.includes('--synthetic-only') &&
    manifest.publicDocumentCount !== 4
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
