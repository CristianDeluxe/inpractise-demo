import type { CorpusDocument } from './CorpusDocument.ts'
import { sha256 } from './sha256.ts'

export function passageHash(document: CorpusDocument): string {
  return sha256(
    [...document.passages]
      .sort((a, b) => a.ordinal - b.ordinal)
      .map((p) =>
        [
          p.passageId,
          String(p.ordinal),
          p.section,
          p.speaker ?? '',
          p.speakerRole ?? '',
          p.text,
          String(p.tokenCount + p.metadataTokenCount),
        ]
          .map((value) => `${String(Array.from(value).length)}:${value}`)
          .join(''),
      )
      .join(''),
  )
}
