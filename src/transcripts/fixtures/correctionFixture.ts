import type { CorrectionRun } from '../contracts/CorrectionRun'
import { editFixture } from './editFixture'

export function correctionFixture(): CorrectionRun {
  return {
    id: 'run-1',
    transcriptId: 'synthetic-1',
    provider: 'max-lane',
    model: 'synthetic-model',
    startedAt: '2026-01-03T00:00:00.000Z',
    durationMs: 12_000,
    usage: { inputTokens: 1200, outputTokens: 300 },
    memory: { glossaryEntries: 2, glossaryHits: 1, examplesUsed: 1 },
    paragraphs: [
      {
        paragraphId: 'p0001',
        text: 'Revenue grew twelve percent at Northwind Ledger last year.',
        edits: [
          editFixture('e1', 'Northwynd', 'Northwind'),
          editFixture('e2', 'Ledgar', 'Ledger', { origin: 'memory' }),
        ],
      },
      {
        paragraphId: 'p0002',
        text: 'We hired forty people in Q3.',
        edits: [
          editFixture('e3', 'fourty', 'forty', {
            paragraphId: 'p0002',
            category: 'grammar',
          }),
        ],
      },
      { paragraphId: 'p0003', text: 'Thanks everyone.', edits: [] },
    ],
  }
}
