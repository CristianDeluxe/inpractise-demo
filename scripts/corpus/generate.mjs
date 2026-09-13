import { open, unlink } from 'node:fs/promises'
import { assertRuntime } from './assertRuntime.mjs'
import { generateInterview } from './generateInterview.mjs'
import { loadApiKey } from './loadApiKey.mjs'
import { readGenerationRound } from './readGenerationRound.mjs'
import { readJson } from './readJson.mjs'
import { selectGenerationSource } from './selectors/selectGenerationSource.mjs'

try {
  const root = await assertRuntime()
  const lockPath = `${root}/corpus/generated/briefing-i/generation.lock`
  const lock = await open(lockPath, 'wx')
  try {
    const core = await readJson(`${root}/corpus/core.json`)
    const deadline = Date.now() + 600000
    let round = await readGenerationRound(root, core)
    while (Date.now() < deadline) {
      const sourceId = selectGenerationSource(round)
      if (!sourceId) break
      const source = core.documents.find(
        (document) => document.sourceId === sourceId,
      )
      await generateInterview(root, source, await loadApiKey(root), deadline)
      round = await readGenerationRound(root, core)
    }
    const passed = round.records.filter(
      (record) => record.status === 'generated_pending_review',
    ).length
    const attempts = round.records.reduce(
      (sum, record) => sum + record.attempts.length,
      0,
    )
    console.log(
      `GENERATION: ${passed}/${round.records.length} sources passed; ${attempts}/${round.maxAttempts} attempts; owner review pending.`,
    )
    if (passed !== round.records.length) process.exitCode = 1
  } finally {
    await lock.close()
    await unlink(lockPath)
  }
} catch (error) {
  console.error(
    error.message.startsWith('MISSING_') ? error.message : 'GENERATION_FAILED',
  )
  process.exitCode = 1
}
