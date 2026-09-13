import assert from 'node:assert/strict'

export function validateInterviewTurn(turn, index, core) {
  assert.deepEqual(Object.keys(turn).sort(), [
    'paragraphId',
    'section',
    'speaker',
    'speakerRole',
    'text',
  ])
  assert.equal(turn.paragraphId, `P${index + 1}`)
  assert.equal(turn.section, 'Interview')
  assert.equal(
    turn.speaker,
    index === 0 || (index >= 4 && index % 2 === 0)
      ? 'Moderator'
      : 'Fictional operator',
  )
  assert.equal(
    turn.speakerRole,
    turn.speaker === 'Moderator' ? 'Moderator' : core.turns[1].speakerRole,
  )
  assert.ok(
    typeof turn.text === 'string' &&
      turn.text.trim().length > 0 &&
      Array.from(turn.text).length <= 1200,
  )
  if (index >= 4)
    assert.ok(
      !/\d|https?:|@|\b(?:Microsoft|Costco|OpenAI|Google|Amazon|Apple|Meta|Salesforce)\b/i.test(
        turn.text,
      ),
      'NEW_NUMERICAL_OR_REAL_ENTITY_CLAIM',
    )
}
