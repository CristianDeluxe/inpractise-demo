import { CompanyCard } from './CompanyCard'
import type { CompanyGridProps } from './CompanyGridProps'
import { summariseCompanies } from './summariseCompanies'

export function CompanyGrid({ library }: CompanyGridProps) {
  const companies = summariseCompanies(library)
  return (
    <section aria-label="Companies" className="mb-8">
      <h2 className="sr-only">Companies you may research</h2>
      {companies.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No company is visible to this account.
        </p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((summary) => (
            <li key={summary.company} className="min-w-0">
              <CompanyCard summary={summary} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
