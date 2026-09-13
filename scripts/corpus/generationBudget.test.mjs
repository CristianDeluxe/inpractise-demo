import assert from 'node:assert/strict'
import test from 'node:test'
import { generationRound } from './generationRound.mjs'
import { selectGenerationSource } from './selectors/selectGenerationSource.mjs'

test('generation stops at source and global budgets and preserves provider stops', () => {
  const round = {
    ...generationRound,
    records: generationRound.sourceIds.map((sourceId) => ({
      sourceId,
      status: 'failed',
      attempts: [],
    })),
  }
  for (let index = 0; index < 12; index++) {
    const sourceId = selectGenerationSource(round)
    assert.ok(sourceId)
    round.records
      .find((record) => record.sourceId === sourceId)
      .attempts.push({ status: 'INVALID_INTERVIEW' })
  }
  assert.equal(selectGenerationSource(round), null)
  assert.ok(round.records.every((record) => record.attempts.length <= 3))
  for (const record of round.records) {
    record.attempts = []
    record.status = 'generated_pending_review'
  }
  assert.equal(selectGenerationSource(round), null)
  round.records[0].status = 'failed'
  assert.equal(selectGenerationSource(round), 'S1')
  for (const status of [
    'HTTP_401',
    'HTTP_403',
    'HTTP_429',
    'CONTENT_FILTER',
    'started',
  ]) {
    round.records[1].attempts = [{ status }]
    assert.equal(selectGenerationSource(round), null)
  }
})
