import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { wordFixture } from './wordFixture'

export function closingParagraphFixture(): TranscriptParagraph {
  return {
    id: 'p0003',
    start: 100,
    end: 103,
    words: [wordFixture('Thanks', 100), wordFixture('everyone.', 100.5)],
  }
}
