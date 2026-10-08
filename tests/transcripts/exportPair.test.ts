import { describe, expect, it } from 'vitest'
import { exportPairTexts } from '../../scripts/transcripts/exportPairTexts.ts'
import { reviewDecisionFixture } from './reviewDecisionFixture.ts'
import { reviewEditFixture } from './reviewEditFixture.ts'

describe('exportPairTexts', () => {
  const paragraphs = [
    { id: 'p1', raw: 'Zorbex grue fast' },
    { id: 'p2', raw: 'Quill on rose' },
  ]
  const run = {
    transcriptId: 'demo',
    paragraphs: [
      {
        paragraphId: 'p1',
        text: 'Zorbecks grew fast',
        edits: [
          reviewEditFixture('p1-e1', 'Zorbex', 'Zorbecks'),
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

  it('applies accepted edits and reverts rejected and pending ones', () => {
    const pair = exportPairTexts('demo', paragraphs, run, [
      reviewDecisionFixture('p1-e1', 'accepted'),
      reviewDecisionFixture('p1-e2', 'rejected'),
    ])
    expect(pair.raw).toBe('Zorbex grue fast\n\nQuill on rose')
    expect(pair.final).toBe('Zorbecks grue fast\n\nQuill on rose')
  })

  it('keeps every accepted edit', () => {
    const pair = exportPairTexts('demo', paragraphs, run, [
      reviewDecisionFixture('p1-e1', 'accepted'),
      reviewDecisionFixture('p1-e2', 'accepted'),
      reviewDecisionFixture('p2-e1', 'accepted'),
    ])
    expect(pair.final).toBe('Zorbecks grew fast\n\nQuillon rose')
  })

  it('writes an accepted edit at its recorded position, not the first match', () => {
    const pair = exportPairTexts(
      'demo',
      [{ id: 'p1', raw: 'foo and foo' }],
      {
        transcriptId: 'demo',
        paragraphs: [
          {
            paragraphId: 'p1',
            text: 'foo and bar',
            edits: [{ ...reviewEditFixture('p1-e1', 'foo', 'bar'), at: [8] }],
          },
        ],
      },
      [reviewDecisionFixture('p1-e1', 'accepted')],
    )
    expect(pair.final).toBe('foo and bar')
  })

  it('exports the raw text when nothing was accepted, whatever the corrector rewrote', () => {
    const pair = exportPairTexts('demo', paragraphs, run, [
      reviewDecisionFixture('p1-e1', 'rejected'),
    ])
    expect(pair.final).toBe(pair.raw)
  })
})
