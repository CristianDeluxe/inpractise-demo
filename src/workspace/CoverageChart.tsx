import type { CoverageProps } from './CoverageProps'

export function CoverageChart({ companies, maximum }: CoverageProps) {
  return (
    <section aria-label="Research coverage" className="min-w-0 py-6 lg:pr-8">
      <h2 className="font-sans text-xl">Research coverage</h2>
      <p className="mt-2 text-xs text-muted-foreground">
        Authorized citable paragraphs per company. Public filings and synthetic
        interviews only.
      </p>
      <ul className="mt-6 space-y-5">
        {companies.map((item) => (
          <li key={item.company}>
            <div className="flex flex-wrap justify-between gap-2 text-sm">
              <span className="break-words">{item.company}</span>
              <span className="font-mono tabular-nums">
                {item.passages === undefined
                  ? 'Count unavailable'
                  : `${String(item.passages)} paragraphs`}
              </span>
            </div>
            {item.passages === undefined ? null : (
              <div aria-hidden="true" className="mt-2 h-6 bg-secondary">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${String(maximum > 0 ? (item.passages / maximum) * 100 : 0)}%`,
                  }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      {companies.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          No authorized coverage for this selection.
        </p>
      ) : null}
    </section>
  )
}
