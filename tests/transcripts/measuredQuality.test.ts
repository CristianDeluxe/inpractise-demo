import { measuredOn } from '@/transcripts/quality/measuredOn.ts'
import { measuredQuality } from '@/transcripts/quality/measuredQuality.ts'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { QualityReport } from './QualityReport.ts'
import { qualityFromReport } from './qualityFromReport.ts'

describe('measuredQuality', () => {
  it('matches docs/transcript-quality.json', () => {
    const report = JSON.parse(
      readFileSync('docs/transcript-quality.json', 'utf8'),
    ) as QualityReport
    expect(measuredOn).toBe(report.measuredOn)
    expect(measuredQuality).toEqual(qualityFromReport(report.episodes))
  })
})
