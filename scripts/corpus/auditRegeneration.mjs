import { assertRuntime } from './assertRuntime.mjs'
import { auditGenerationAttempt } from './auditGenerationAttempt.mjs'
import { readGenerationRound } from './readGenerationRound.mjs'
import { readJson } from './readJson.mjs'
import { writeExpansionReview } from './writeExpansionReview.mjs'
import { writeJson } from './writeJson.mjs'

try {
  const root = await assertRuntime()
  const core = await readJson(`${root}/corpus/core.json`)
  const round = await readGenerationRound(root, core)
  const audit = {
    roundId: round.id,
    synthetic: true,
    disclosure: 'Synthetic interview — fictional company and speaker',
    status: 'not_in_accepted_manifest',
    promptPath: round.promptPath,
    promptSha256: round.promptSha256,
    maxAttempts: round.maxAttempts,
    maxAttemptsPerSource: round.maxAttemptsPerSource,
    attempts: [],
    reviews: [],
    usage: {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      unknownAttempts: 0,
    },
  }
  for (const record of round.records) {
    const source = core.documents.find(
      (document) => document.sourceId === record.sourceId,
    )
    for (const attempt of record.attempts) {
      const entry = {
        sourceId: source.sourceId,
        attempt: attempt.attempt,
        rawPath: attempt.rawPath ?? null,
        status: attempt.status,
        words: null,
        validationError: null,
        usage: attempt.usage,
      }
      await auditGenerationAttempt(root, attempt, entry, source)
      if (attempt.rawPath) {
        const draft = await readJson(`${root}/${attempt.rawPath}`)
        entry.turnWordCounts = draft.turns.map((turn) => ({
          paragraphId: turn.paragraphId,
          words: turn.text.trim().split(/\s+/u).length,
        }))
      }
      audit.attempts.push(entry)
      if (attempt.usage) {
        audit.usage.promptTokens += attempt.usage.promptTokens
        audit.usage.completionTokens += attempt.usage.completionTokens
        audit.usage.totalTokens += attempt.usage.totalTokens
      } else audit.usage.unknownAttempts++
      if (record.selectedAttempt === attempt.attempt)
        audit.reviews.push(await writeExpansionReview(root, source, attempt))
    }
  }
  await writeJson(`${root}/${round.directory}/audit.json`, audit)
  console.log(
    `AUDIT: ${audit.attempts.length}/${round.maxAttempts} attempts; ${audit.reviews.length}/5 expanded drafts passed; ${audit.attempts.filter((attempt) => attempt.validationError).length} rejected drafts; no provider calls.`,
  )
  console.log(
    `USAGE: prompt=${audit.usage.promptTokens}; completion=${audit.usage.completionTokens}; total=${audit.usage.totalTokens}; unknown=${audit.usage.unknownAttempts}.`,
  )
} catch {
  console.error('REGENERATION_AUDIT_FAILED')
  process.exitCode = 1
}
