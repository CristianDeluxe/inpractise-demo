import { readFile } from 'node:fs/promises'
import { createGenerationAttempt } from './createGenerationAttempt.mjs'
import { readGenerationRound } from './readGenerationRound.mjs'
import { readInterviewAttempt } from './readInterviewAttempt.mjs'
import { readJson } from './readJson.mjs'
import { requestInterviewResponse } from './requestInterviewResponse.mjs'
import { selectGenerationSource } from './selectors/selectGenerationSource.mjs'
import { writeJson } from './writeJson.mjs'

export async function generateInterview(root, core, apiKey, deadline) {
  const round = await readGenerationRound(
    root,
    await readJson(`${root}/corpus/core.json`),
  )
  if (selectGenerationSource(round) !== core.sourceId || Date.now() >= deadline)
    throw new Error('GENERATION_BUDGET_OR_STOP')
  const prompt = await readFile(`${root}/${round.promptPath}`, 'utf8')
  const record = round.records.find((item) => item.sourceId === core.sourceId)
  const recordPath = `${root}/${round.directory}/${core.documentId}.generation.json`
  const entry = createGenerationAttempt(record.attempts.length + 1)
  record.attempts.push(entry)
  await writeJson(recordPath, record)
  try {
    const response = await requestInterviewResponse(core, apiKey, deadline, {
      prompt,
      record,
    })
    entry.httpStatus = response.status
    if (!response.ok) {
      await response.body?.cancel()
      entry.status = `HTTP_${response.status}`
    } else {
      const outcome = await readInterviewAttempt(
        root,
        core,
        await response.json(),
        { entry, directory: round.directory },
      )
      if (outcome === 'accepted') {
        entry.status = 'valid'
        record.status = 'generated_pending_review'
        record.selectedAttempt = entry.attempt
      }
    }
  } catch {
    entry.status = 'REQUEST_FAILED'
  } finally {
    await writeJson(recordPath, record)
  }
  console.log(
    `${core.sourceId}: ${record.status}; attempt=${entry.attempt}; status=${entry.status}; tokens=${entry.usage?.totalTokens ?? 'unknown'}`,
  )
  return record
}
