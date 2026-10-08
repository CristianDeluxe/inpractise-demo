import { formatCompanyName } from '@/components/formatters/formatCompanyName'
import type { CompanyFilterProps } from './CompanyFilterProps'
import { companyChoices } from './companyChoices'

export function CompanyFilter({
  library,
  company,
  onChange,
}: CompanyFilterProps) {
  return (
    <div className="mb-8 max-w-sm">
      <label htmlFor="company" className="mb-2 block text-sm font-medium">
        Company scope
      </label>
      <select
        id="company"
        value={company}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        className="field"
      >
        <option value="">All authorized companies</option>
        {companyChoices(library).map((choice) => (
          <option key={choice} value={choice}>
            {formatCompanyName(choice)}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-muted-foreground">
        Limits the interviews shown and the answers you ask for to this company.
      </p>
    </div>
  )
}
