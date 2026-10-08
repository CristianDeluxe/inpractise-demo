import type { PreparedParagraph } from '../../scripts/transcripts/PreparedParagraph.ts'

export function preparedParagraphFixture(): PreparedParagraph {
  return {
    id: 'p0007',
    raw: 'we met Zorbex today',
    text: 'we met Zorbecks today',
    marked: 'we met [[Zorbex|0.80]] today',
    memoryEdits: [
      {
        paragraphId: 'p0007',
        from: 'Zorbex',
        to: 'Zorbecks',
        category: 'entity',
        origin: 'memory',
        reason: 'Learned from demo0001',
        confidence: 1,
      },
    ],
  }
}
