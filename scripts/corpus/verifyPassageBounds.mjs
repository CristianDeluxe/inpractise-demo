import assert from 'node:assert/strict'
import { countTokens } from './countTokens.mjs'

export function verifyPassageBounds(passage, index) {
  assert.equal(passage.ordinal, index + 1)
  assert.equal(passage.startChar, 0)
  assert.equal(passage.endChar, Array.from(passage.text).length)
  assert.ok(
    passage.endChar > 0 && passage.endChar <= 1200,
    'PASSAGE_CODEPOINT_BOUND',
  )
  assert.equal(passage.tokenCount, countTokens(passage.text))
  assert.ok(
    passage.tokenCount > 0 && passage.tokenCount <= 450,
    'PASSAGE_TOKEN_BOUND',
  )
  assert.ok(passage.tokenCount + passage.metadataTokenCount <= 500)
  assert.ok(
    passage.tokenCount >= 100 || typeof passage.shortPassageReason === 'string',
    'SHORT_PASSAGE_REASON',
  )
}
