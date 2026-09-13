import { assertRuntime } from './assertRuntime.mjs'
import { verifyCorpus } from './verifyCorpus.mjs'

try {
  const root = await assertRuntime()
  for (const line of await verifyCorpus(root)) console.log(line)
} catch (error) {
  console.error(
    `FAIL: ${error.code ?? 'CORPUS_INVARIANT'}${typeof error.message === 'string' && /^[A-Z_]+$/.test(error.message) ? ` ${error.message}` : ''}`,
  )
  process.exitCode = 1
}
