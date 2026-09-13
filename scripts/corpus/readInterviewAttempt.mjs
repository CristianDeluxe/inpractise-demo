import { writeFile } from 'node:fs/promises'
import { readGenerationMetadata } from './readGenerationMetadata.mjs'
import { sha256 } from './sha256.mjs'
import { validateInterview } from './validators/validateInterview.mjs'

export async function readInterviewAttempt(root, core, body, context) {
  const { entry, directory = 'corpus/generated' } = context
  const attempt = entry.attempt
  if (readGenerationMetadata(body, entry) === 'stop') return 'stop'
  const content = body.choices?.[0]?.message?.content
  if (typeof content !== 'string') {
    entry.status = 'MISSING_CONTENT'
    return 'retry'
  }
  const rawPath = `${directory}/${core.documentId}.attempt-${attempt}.json`
  await writeFile(`${root}/${rawPath}`, content)
  entry.rawPath = rawPath
  entry.rawSha256 = sha256(content)
  if (entry.finishReason !== 'stop') {
    entry.status = 'TRUNCATED_OUTPUT'
    return 'retry'
  }
  try {
    entry.validation = validateInterview(JSON.parse(content), core)
  } catch (error) {
    entry.status = 'INVALID_INTERVIEW'
    entry.validationError = /^[A-Z_]+$/.test(error.message)
      ? error.message
      : 'SCHEMA_OR_GOLD_MISMATCH'
    return 'retry'
  }
  return 'accepted'
}
