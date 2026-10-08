import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { wordFixture } from './wordFixture'

export function hiringParagraphFixture(): TranscriptParagraph {
  return {
    id: 'p0002',
    start: 65,
    end: 70,
    words: [
      wordFixture('We', 65),
      wordFixture('hired', 65.5),
      wordFixture('fourty', 66, 'low', ['low-confidence']),
      wordFixture('people', 66.5),
      wordFixture('in', 67),
      wordFixture('Q3.', 67.5),
    ],
  }
}
