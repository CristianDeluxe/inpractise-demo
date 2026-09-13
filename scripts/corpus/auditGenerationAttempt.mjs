import { readFile } from 'node:fs/promises'
import { validateInterview } from './validators/validateInterview.mjs'

export async function auditGenerationAttempt(root, attempt, entry, source) {
  if (!attempt.rawPath) return
  try {
    const draft = JSON.parse(
      await readFile(`${root}/${attempt.rawPath}`, 'utf8'),
    )
    entry.words = draft.turns
      .map((turn) => turn.text)
      .join(' ')
      .trim()
      .split(/\s+/u).length
    validateInterview(draft, source)
  } catch (error) {
    entry.validationError = /^[A-Z_]+$/.test(error.message)
      ? error.message
      : 'SCHEMA_OR_GOLD_MISMATCH'
  }
}
