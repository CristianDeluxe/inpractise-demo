import { formatCount } from '@/transcripts/formatters/formatCount'
import { BasisTag } from './BasisTag'
import { costLabel } from './costLabel'
import { embeddingCostUsd } from './embeddingCostUsd'
import type { EmbeddingSectionProps } from './EmbeddingSectionProps'

export function EmbeddingSection({ tokens }: EmbeddingSectionProps) {
  return (
    <section aria-labelledby="embedding-heading" className="mt-12">
      <h2 id="embedding-heading" className="text-2xl">
        One-off corpus embedding
        <BasisTag basis="estimated" />
      </h2>
      <p className="prose-measure mt-3 text-muted-foreground">
        Embedding the two interviews once, with text-embedding-3-small. Tokens
        are the stored passage token counts; the provider&apos;s own count may
        differ slightly. Embeddings are reused by every question afterwards.
      </p>
      <dl className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="metric">
          <dt>Passage tokens embedded</dt>
          <dd>{formatCount(tokens)}</dd>
        </div>
        <div className="metric">
          <dt>One-off cost at list price</dt>
          <dd>{costLabel(embeddingCostUsd(tokens))}</dd>
        </div>
      </dl>
    </section>
  )
}
