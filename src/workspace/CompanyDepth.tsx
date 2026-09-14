import type { CoverageProps } from './CoverageProps'

export function CompanyDepth({ companies, maximum }: CoverageProps) {
  return (
    <section
      aria-label="Depth by company"
      className="min-w-0 border-t border-border py-6 lg:border-l lg:border-t-0 lg:pl-8"
    >
      <h2 className="font-sans text-xl">Depth by company</h2>
      <p className="mt-2 text-xs text-muted-foreground">
        Synthetic interviews and authorized paragraphs, relative to the largest
        company count shown.
      </p>
      <ul className="mt-6 space-y-5">
        {companies.map((item) => (
          <li key={item.company} className="text-sm">
            <p className="break-words font-medium">{item.company}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {item.interviews} synthetic interviews
              {item.passages === undefined
                ? ''
                : ` · ${String(item.passages)} paragraphs`}
            </p>
            {item.passages === undefined ? null : (
              <meter
                aria-label={`${item.company} paragraph depth`}
                className="mt-2 block h-3 w-full"
                min={0}
                max={maximum || 1}
                value={item.passages}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
