import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { wordFixture } from './wordFixture'

export function ledgerParagraphFixture(): TranscriptParagraph {
  return {
    id: 'p0001',
    start: 0,
    end: 5,
    words: [
      wordFixture('Revenue', 0),
      wordFixture('grew', 0.5),
      wordFixture('twelve', 1, 'medium', ['number']),
      wordFixture('percent', 1.5),
      wordFixture('at', 2),
      wordFixture('Northwynd', 2.5, 'low', ['low-confidence', 'entity']),
      wordFixture('Ledgar', 3, 'low', ['low-confidence', 'memory']),
      wordFixture('last', 3.5),
      wordFixture('year.', 4),
    ],
  }
}
