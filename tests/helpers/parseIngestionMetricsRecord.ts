/**
 * Reads the ingestion throughput record out of its source file rather than
 * importing it. `src/` is typed for the browser and carries no Node types, so
 * a test that needs both the constant and `corpus/ingestion-metrics.json` has
 * to meet them here.
 */
export function parseIngestionMetricsRecord(
  source: string,
): Map<string, string> {
  const entries = [...source.matchAll(/^\s*(\w+): (?:'([^']*)'|(\d+)),$/gmu)]
  return new Map(
    entries.map((entry) => [entry[1] ?? '', entry[2] ?? entry[3] ?? '']),
  )
}
