import type { CorpusCountsProps } from './CorpusCountsProps'

export function CorpusCounts({ corpus }: CorpusCountsProps) {
  return (
    <dl className="my-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
      <div className="metric">
        <dt>Documents</dt>
        <dd>{corpus.documents}</dd>
      </div>
      <div className="metric">
        <dt>Revisions</dt>
        <dd>{corpus.revisions}</dd>
      </div>
      <div className="metric">
        <dt>Passages</dt>
        <dd>{corpus.passages}</dd>
      </div>
      <div className="metric">
        <dt>Vectors</dt>
        <dd>{corpus.vectors}</dd>
      </div>
    </dl>
  )
}
