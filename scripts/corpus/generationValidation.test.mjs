import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import test from 'node:test'
import { createGenerationAttempt } from './createGenerationAttempt.mjs'
import { readInterviewAttempt } from './readInterviewAttempt.mjs'
import { readJson } from './readJson.mjs'

test('provider response replay preserves the generation gate and usage', async () => {
  const root = process.cwd()
  const core = await readJson(`${root}/corpus/core.json`)
  const draft = await readJson(
    `${root}/corpus/generated/briefing-i/s4.attempt-1.json`,
  )
  const temporary = await mkdtemp(`${root}/scripts/corpus/.test-response-`)
  try {
    const source = core.documents.find((document) => document.sourceId === 'S4')
    const body = {
      model: 'gpt-4.1-mini-2025-04-14',
      usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
      choices: [
        { finish_reason: 'stop', message: { content: JSON.stringify(draft) } },
      ],
    }
    const entry = createGenerationAttempt(1)
    assert.equal(
      await readInterviewAttempt(temporary, source, body, {
        entry,
        directory: '.',
      }),
      'accepted',
    )
    assert.equal(entry.validation.words, 710)
    assert.deepEqual(entry.usage, {
      promptTokens: 1,
      completionTokens: 2,
      totalTokens: 3,
    })
    for (const mutation of ['gold', 'short', 'entity', 'number']) {
      const invalid = structuredClone(draft)
      if (mutation === 'gold') invalid.turns[1].text += ' Altered claim.'
      if (mutation === 'short') invalid.turns = invalid.turns.slice(0, 6)
      if (mutation === 'entity')
        invalid.turns[5].text += ' Microsoft supplied it.'
      if (mutation === 'number')
        invalid.turns[5].text += ' There were 99 orders.'
      body.choices[0].message.content = JSON.stringify(invalid)
      const rejected = createGenerationAttempt(2)
      assert.equal(
        await readInterviewAttempt(temporary, source, body, {
          entry: rejected,
          directory: '.',
        }),
        'retry',
      )
      assert.equal(rejected.status, 'INVALID_INTERVIEW')
    }
    body.choices[0].finish_reason = 'content_filter'
    const refused = createGenerationAttempt(3)
    assert.equal(
      await readInterviewAttempt(temporary, source, body, {
        entry: refused,
        directory: '.',
      }),
      'stop',
    )
    assert.equal(refused.status, 'CONTENT_FILTER')
    assert.equal(refused.usage.totalTokens, 3)
  } finally {
    assert.ok(temporary.startsWith(`${root}/scripts/corpus/.test-response-`))
    await rm(temporary, { recursive: true })
  }
})
