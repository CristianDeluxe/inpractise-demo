import { reviewEditFixture } from './reviewEditFixture.ts'

export function reviewRunFixture() {
  return {
    transcriptId: 'demo0002',
    paragraphs: [
      {
        paragraphId: 'p1',
        text: 'Zorbecks grew',
        edits: [
          reviewEditFixture('p1-e1', 'Zorbex,', 'Zorbecks,'),
          reviewEditFixture('p1-e2', 'grue', 'grew', 'grammar'),
        ],
      },
      {
        paragraphId: 'p2',
        text: 'Quillon rose',
        edits: [reviewEditFixture('p2-e1', 'Quill on', 'Quillon')],
      },
    ],
  }
}
