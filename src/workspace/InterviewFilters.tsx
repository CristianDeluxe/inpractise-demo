import { CompanyFilter } from './CompanyFilter'
import type { InterviewFiltersProps } from './InterviewFiltersProps'

export function InterviewFilters({
  library,
  company,
  onCompanyChange,
  titleText,
  onTitleTextChange,
}: InterviewFiltersProps) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2">
      <CompanyFilter
        library={library}
        company={company}
        onChange={onCompanyChange}
      />
      <div className="max-w-sm">
        <label
          htmlFor="title-filter"
          className="mb-2 block text-sm font-medium"
        >
          Filter by title
        </label>
        <input
          id="title-filter"
          type="search"
          value={titleText}
          onChange={(event) => {
            onTitleTextChange(event.target.value)
          }}
          className="field"
        />
      </div>
    </div>
  )
}
