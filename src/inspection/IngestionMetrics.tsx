import { ingestionMetricsRecord } from './ingestionMetricsRecord'

export function IngestionMetrics() {
  return (
    <section className="mb-8 mt-8">
      <p className="eyebrow text-muted-foreground">Latest ingestion</p>
      <h2 className="mt-1 font-sans text-lg">
        {ingestionMetricsRecord.company} ({ingestionMetricsRecord.documentId})
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-5">
        <div className="metric">
          <dt>Pages scanned</dt>
          <dd>{ingestionMetricsRecord.pagesScanned}</dd>
        </div>
        <div className="metric">
          <dt>Pages read</dt>
          <dd>{ingestionMetricsRecord.pagesRead}</dd>
        </div>
        <div className="metric">
          <dt>Blocks</dt>
          <dd>{ingestionMetricsRecord.blocks}</dd>
        </div>
        <div className="metric">
          <dt>Passages</dt>
          <dd>{ingestionMetricsRecord.passages}</dd>
        </div>
        <div className="metric">
          <dt>Tokens</dt>
          <dd>{ingestionMetricsRecord.tokens}</dd>
        </div>
      </dl>
    </section>
  )
}
