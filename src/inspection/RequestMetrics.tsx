import type { RequestMetricsProps } from './RequestMetricsProps'

/**
 * The four numbers that separate a retrieval miss from a selection loss, read
 * as data rather than recovered from a sentence.
 */
export function RequestMetrics({
  candidates,
  selected,
  contextTokens,
  generatedTokens,
}: RequestMetricsProps) {
  return (
    <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-sm">
      <div>
        <dt className="eyebrow text-muted-foreground">Ranked</dt>
        <dd className="font-mono">{candidates}</dd>
      </div>
      <div>
        <dt className="eyebrow text-muted-foreground">Selected</dt>
        <dd className="font-mono">{selected}</dd>
      </div>
      <div>
        <dt className="eyebrow text-muted-foreground">Context</dt>
        <dd className="font-mono">{contextTokens} tokens</dd>
      </div>
      <div>
        <dt className="eyebrow text-muted-foreground">Generated</dt>
        <dd className="font-mono">
          {generatedTokens === null
            ? 'unknown'
            : `${String(generatedTokens)} tokens`}
        </dd>
      </div>
    </dl>
  )
}
