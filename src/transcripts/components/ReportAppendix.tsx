import type { ReportAppendixProps } from './ReportAppendixProps'

export function ReportAppendix({ terms }: ReportAppendixProps) {
  return (
    <section aria-labelledby="report-appendix" className="rule-top mt-14 pt-6">
      <h2 id="report-appendix" className="text-xl">
        Appendix: entities and terms corrected
      </h2>
      {terms.length === 0 ? (
        <p className="mt-4 text-muted-foreground">
          No entity, term or number corrections were applied.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-border font-mono text-sm">
          {terms.map((term) => (
            <li key={`${term.from}|${term.to}`} className="flex gap-3 py-2">
              <span>
                <del>{term.from}</del> {'→'} <strong>{term.to}</strong>
              </span>
              {term.count > 1 ? (
                <span className="text-muted-foreground">
                  x{String(term.count)}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
