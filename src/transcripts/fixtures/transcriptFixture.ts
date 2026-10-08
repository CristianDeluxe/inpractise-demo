import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { closingParagraphFixture } from './closingParagraphFixture'
import { hiringParagraphFixture } from './hiringParagraphFixture'
import { ledgerParagraphFixture } from './ledgerParagraphFixture'

/** Invented company and invented sentences; never real podcast text. */
export function transcriptFixture(): TranscriptDocument {
  return {
    id: 'synthetic-1',
    source: {
      youtubeId: 'synthetic-1',
      title: 'Synthetic briefing about Northwind Ledger',
      channel: 'Invented Channel',
      url: 'https://example.invalid/watch',
      durationSeconds: 125,
      uploadDate: '2026-01-01',
    },
    asrModel: 'parakeet-tdt-0.6b-v3',
    transcribedAt: '2026-01-02T00:00:00.000Z',
    asrSeconds: 4,
    paragraphs: [
      ledgerParagraphFixture(),
      hiringParagraphFixture(),
      closingParagraphFixture(),
    ],
    stats: { words: 17, high: 12, medium: 1, low: 3, flagged: 3 },
  }
}
