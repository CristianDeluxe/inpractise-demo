import assert from 'node:assert/strict'
import { passageSpeaker } from './passageSpeaker.mjs'

export function verifyPassageOffsets(document, passage) {
  const turn = document.sourceTurns.find(
    (item) => item.paragraphId === passage.paragraphId,
  )
  assert.ok(turn)
  assert.equal(passage.speakerKind, turn.speaker)
  assert.equal(passage.speakerRole, turn.speakerRole)
  assert.equal(passage.speaker, passageSpeaker(document, turn))
  assert.equal(
    passage.text,
    Array.from(turn.text)
      .slice(passage.sourceStartChar, passage.sourceEndChar)
      .join(''),
    'SOURCE_OFFSET_MAPPING',
  )
  assert.equal(
    passage.text,
    Array.from(document.sourceText)
      .slice(passage.documentStartChar, passage.documentEndChar)
      .join(''),
    'DOCUMENT_OFFSET_MAPPING',
  )
}
