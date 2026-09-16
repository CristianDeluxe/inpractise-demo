// The one-off throughput record for the newest ingested document. It is not
// decorative: tests/unit/ingestionMetricsRecord.test.ts recomputes every field from
// corpus/ingestion-metrics.json, so a re-ingestion that changes these numbers
// fails the suite rather than leaving a stale figure on the inspect page.
export const ingestionMetricsRecord = {
  documentId: 'rr-2024',
  company: 'Rolls-Royce Holdings',
  pagesScanned: 80,
  pagesRead: 11,
  blocks: 132,
  passages: 132,
  tokens: 5524,
  parseMs: 349,
} as const
