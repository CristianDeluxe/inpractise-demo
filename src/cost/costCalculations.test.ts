import { bundleFixture } from '@/transcripts/fixtures/bundleFixture'
import { transcriptFixture } from '@/transcripts/fixtures/transcriptFixture'
import { describe, expect, it } from 'vitest'
import { buildCostRow } from './buildCostRow'
import { costRowFixture } from './costRowFixture'
import { minutesPerAudioHour } from './minutesPerAudioHour'
import { totalMinutesPerAudioHour } from './totalMinutesPerAudioHour'

describe('minutesPerAudioHour', () => {
  it('scales reviewer minutes to one hour of audio', () => {
    expect(minutesPerAudioHour(600, 1800)).toBe(20)
  })
  it('is undefined without audio', () => {
    expect(minutesPerAudioHour(600, 0)).toBeUndefined()
  })
})

describe('totalMinutesPerAudioHour', () => {
  it('pools measured transcripts and leaves unmeasured audio out', () => {
    expect(
      totalMinutesPerAudioHour([
        costRowFixture({ reviewerSeconds: 1200, audioSeconds: 3600 }),
        costRowFixture({ reviewerSeconds: 600, audioSeconds: 3600 }),
        costRowFixture({ reviewerSeconds: undefined, audioSeconds: 36000 }),
      ]),
    ).toBe(15)
  })
  it('is undefined when nothing was measured', () => {
    expect(totalMinutesPerAudioHour([])).toBeUndefined()
    expect(
      totalMinutesPerAudioHour([
        costRowFixture({ reviewerSeconds: undefined }),
      ]),
    ).toBeUndefined()
  })
})

describe('buildCostRow', () => {
  const { transcript } = bundleFixture()
  const summary = {
    id: transcript.id,
    source: transcript.source,
    stats: transcript.stats,
    hasCorrection: true,
    edits: 3,
    reviewed: 3,
  }
  it('counts proposed and decided edits and estimates reviewer time', () => {
    const row = buildCostRow(summary, {
      ...bundleFixture(),
      review: [
        {
          editId: 'e1',
          verdict: 'accepted',
          decidedAt: '2026-01-01T10:00:00Z',
        },
        {
          editId: 'e2',
          verdict: 'rejected',
          decidedAt: '2026-01-01T10:01:00Z',
        },
        {
          editId: 'e3',
          verdict: 'deferred',
          decidedAt: '2026-01-01T10:02:00Z',
        },
      ],
    })
    expect(row.proposedEdits).toBe(3)
    expect(row.decidedEdits).toBe(2)
    expect(row.audioSeconds).toBe(transcriptFixture().source.durationSeconds)
    expect(row.reviewerSeconds).toBe(120)
    expect(row.minutesPerAudioHour).toBeCloseTo(2 / (125 / 3600), 5)
  })
  it('reports no measurement for a transcript nobody reviewed', () => {
    const row = buildCostRow(summary, bundleFixture())
    expect(row.decidedEdits).toBe(0)
    expect(row.reviewerSeconds).toBeUndefined()
    expect(row.minutesPerAudioHour).toBeUndefined()
  })
})
