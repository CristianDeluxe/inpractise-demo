import { createPassage } from './createPassage.mjs'
import { splitTurnFragments } from './splitTurnFragments.mjs'

export function splitPassages(turns, document) {
  const passages = []
  let documentOffset = 0
  for (const turn of turns) {
    const fragments = splitTurnFragments(turn.text)
    for (const [index, fragment] of fragments.entries())
      passages.push(
        createPassage(turn, document, fragment, {
          fragments,
          index,
          ordinal: passages.length + 1,
          documentOffset,
        }),
      )
    documentOffset += Array.from(turn.text).length + 2
  }
  return passages
}
