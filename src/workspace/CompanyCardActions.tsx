import { Link } from '@tanstack/react-router'
import type { CompanyCardActionsProps } from './CompanyCardActionsProps'

export function CompanyCardActions({ company }: CompanyCardActionsProps) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
      <Link to="/app/ask" search={{ company }} className="action">
        Ask about {company}
      </Link>
      <Link
        to="/app/library"
        search={{ company }}
        aria-label={`Sources for ${company}`}
        className="text-sm text-primary"
      >
        Browse sources
      </Link>
    </div>
  )
}
