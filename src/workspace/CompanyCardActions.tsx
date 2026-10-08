import { formatCompanyName } from '@/components/formatters/formatCompanyName'
import { Link } from '@tanstack/react-router'
import type { CompanyCardActionsProps } from './CompanyCardActionsProps'

export function CompanyCardActions({ company }: CompanyCardActionsProps) {
  const name = formatCompanyName(company)
  return (
    <div className="mt-auto flex items-center gap-5 border-t border-border pt-4">
      <Link
        to="/app/ask"
        search={{ company }}
        aria-label={`Ask about ${name}`}
        className="action"
      >
        Ask
      </Link>
      <Link
        to="/app"
        search={{ company }}
        aria-label={`Interviews with ${name}`}
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        Interviews
      </Link>
    </div>
  )
}
