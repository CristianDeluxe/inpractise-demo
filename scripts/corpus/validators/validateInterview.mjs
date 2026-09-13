import assert from 'node:assert/strict'
import { canonicalJson } from '../canonicalJson.mjs'
import { validateInterviewTurn } from './validateInterviewTurn.mjs'

export function validateInterview(draft, core) {
  assert.deepEqual(Object.keys(draft).sort(), [
    'disclosure',
    'origin',
    'sourceId',
    'title',
    'turns',
  ])
  assert.equal(draft.sourceId, core.sourceId)
  assert.equal(draft.title, core.title)
  assert.equal(draft.origin, 'synthetic')
  assert.equal(draft.disclosure, core.disclosure)
  assert.ok(
    Array.isArray(draft.turns) &&
      draft.turns.length > 4 &&
      draft.turns.length <= 30,
  )
  assert.equal(
    canonicalJson(draft.turns.slice(0, 4)),
    canonicalJson(core.turns),
  )
  for (const [index, turn] of draft.turns.entries())
    validateInterviewTurn(turn, index, core)
  const words = draft.turns
    .map((turn) => turn.text)
    .join(' ')
    .trim()
    .split(/\s+/u).length
  assert.ok(words >= 700 && words <= 900, 'INTERVIEW_WORD_TARGET')
  return {
    words,
    status: 'structurally_valid',
    semanticReview: 'pending_owner',
  }
}
