import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { IngestionMetricsRecordSchema } from '../helpers/IngestionMetricsRecordSchema.ts'
import { NormalisedDocumentPassagesSchema } from '../helpers/NormalisedDocumentPassagesSchema.ts'
import { parseIngestionMetricsRecord } from '../helpers/parseIngestionMetricsRecord.ts'

describe('inspect page ingestion metrics', () => {
  const shown = parseIngestionMetricsRecord(
    readFileSync('src/inspection/ingestionMetricsRecord.ts', 'utf8'),
  )
  const recorded = IngestionMetricsRecordSchema.parse(
    JSON.parse(readFileSync('corpus/ingestion-metrics.json', 'utf8')),
  )
  const normalised = NormalisedDocumentPassagesSchema.parse(
    JSON.parse(readFileSync('corpus/normalised/rr-2024.json', 'utf8')),
  )

  it('matches the recorded ingestion-metrics.json file', () => {
    expect(shown.get('documentId')).toBe(recorded.documentId)
    expect(shown.get('company')).toBe(recorded.company)
    expect(shown.get('pagesScanned')).toBe(String(recorded.pagesScanned))
    expect(shown.get('pagesRead')).toBe(String(recorded.pagesRead))
    expect(shown.get('blocks')).toBe(String(recorded.blocks))
    expect(shown.get('passages')).toBe(String(recorded.passages))
    expect(shown.get('tokens')).toBe(String(recorded.tokens))
    expect(shown.get('parseMs')).toBe(String(recorded.parseMs))
  })

  it('sums to the actual passage count and token total in the normalised document', () => {
    expect(normalised.passages).toHaveLength(recorded.passages)
    const tokens = normalised.passages.reduce(
      (total, passage) => total + passage.tokenCount,
      0,
    )
    expect(tokens).toBe(recorded.tokens)
  })
})
