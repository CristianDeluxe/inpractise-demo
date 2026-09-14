import type { RevisionCurrencyProps } from './RevisionCurrencyProps'

export function RevisionCurrency({ revisions }: RevisionCurrencyProps) {
  return (
    <section className="mb-8 rounded-lg border border-border bg-card p-6">
      <h2 className="font-sans text-xl">Evidence read at answer time</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Each revision quoted by this answer, and whether it is still the current
        revision of its document. A superseded revision was accurate when the
        answer was written; the memo should note that it has since changed.
      </p>
      {revisions.length === 0 ? (
        <p className="mt-4 text-sm">
          No revisions were recorded against this answer.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {revisions.map((revision) => (
            <li
              key={revision.revisionId}
              className="border-t border-border pt-4"
            >
              <p className="font-mono text-xs text-muted-foreground">
                {revision.documentId ?? 'document no longer accessible'} ·{' '}
                {revision.revisionId}
              </p>
              <p className="mt-2 text-sm">
                {revision.current
                  ? 'Current revision.'
                  : 'Superseded since this answer.'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
