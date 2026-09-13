import { writeFile } from 'node:fs/promises'
import { assertRuntime } from './assertRuntime.mjs'
import { auditGenerationAttempt } from './auditGenerationAttempt.mjs'
import { readJson } from './readJson.mjs'
import { writeJson } from './writeJson.mjs'

try {
  const root = await assertRuntime()
  const core = await readJson(`${root}/corpus/core.json`)
  const audit = {
    synthetic: true,
    disclosure:
      'Rejected synthetic interview drafts — fictional companies and speakers; not accepted research evidence.',
    attempts: [],
  }
  for (const source of core.documents.slice(0, 5)) {
    const record = await readJson(
      `${root}/corpus/generated/${source.documentId}.generation.json`,
    )
    for (const attempt of record.attempts) {
      const entry = {
        sourceId: source.sourceId,
        attempt: attempt.attempt,
        rawPath: attempt.rawPath ?? null,
        status: attempt.status,
        words: null,
        validationError: null,
      }
      await auditGenerationAttempt(root, attempt, entry, source)
      audit.attempts.push(entry)
    }
  }
  await writeJson(`${root}/corpus/generated/audit.json`, audit)
  await writeFile(
    `${root}/corpus/generated/README.md`,
    '# Rejected synthetic drafts\n\nSynthetic interview — fictional company and speaker. These raw provider outputs are acquisition records, not approved interview documents. Every attempt is covered by its source-specific generation sidecar, including its raw SHA-256, model, prompt hash, actual generation timestamp and usage. The provider response schema uses origin="synthetic" and an explicit disclosure; the accepted document schema additionally uses synthetic=true. Do not import these drafts. See audit.json for the exact word count and first validation failure. The ten-attempt budget is exhausted; rerunning generate.mjs reuses the checkpoints and makes no new requests.\n',
  )
  console.log(
    `AUDIT: ${audit.attempts.length} attempts; ${audit.attempts.filter((entry) => entry.validationError).length} rejected drafts; no provider calls.`,
  )
} catch {
  console.error('GENERATION_AUDIT_FAILED')
  process.exitCode = 1
}
