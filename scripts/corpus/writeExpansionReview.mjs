import { writeFile } from 'node:fs/promises'
import { generationRound } from './generationRound.mjs'
import { normaliseDocument } from './normaliseDocument.mjs'
import { readJson } from './readJson.mjs'
import { renderTranscript } from './renderTranscript.mjs'
import { sha256 } from './sha256.mjs'
import { validateInterview } from './validators/validateInterview.mjs'
import { writeJson } from './writeJson.mjs'

export async function writeExpansionReview(root, source, attempt) {
  const draft = await readJson(`${root}/${attempt.rawPath}`)
  const validation = validateInterview(draft, source)
  const document = normaliseDocument(source, draft.turns)
  const normalisedPath = `${generationRound.directory}/${source.documentId}.review.json`
  const transcriptPath = `${generationRound.directory}/${source.documentId}.review.txt`
  await writeJson(`${root}/${normalisedPath}`, document)
  const transcript = renderTranscript(source, draft.turns)
  await writeFile(`${root}/${transcriptPath}`, transcript)
  return {
    sourceId: source.sourceId,
    synthetic: true,
    disclosure: source.disclosure,
    status: 'pending_owner_review',
    selectedAttempt: attempt.attempt,
    words: validation.words,
    normalisedPath,
    revisionId: document.revisionId,
    transcriptPath,
    transcriptSha256: sha256(transcript),
    passageCount: document.passages.length,
    goldPassageIds: ['P1', 'P2', 'P3', 'P4'],
    distractorPassageIds: ['P12', 'P14'],
    rawPath: attempt.rawPath,
    rawSha256: attempt.rawSha256,
  }
}
