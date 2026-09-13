import assert from 'node:assert/strict'

export function verifySourceCoverage(document) {
  for (const turn of document.sourceTurns) {
    const fragments = document.passages.filter(
      (passage) => passage.paragraphId === turn.paragraphId,
    )
    assert.equal(
      fragments.map((passage) => passage.text).join(''),
      turn.text,
      'LOSSLESS_SOURCE_COVERAGE',
    )
    let next = 0
    for (const fragment of fragments) {
      assert.equal(fragment.sourceStartChar, next)
      next = fragment.sourceEndChar
    }
    assert.equal(next, Array.from(turn.text).length)
  }
}
