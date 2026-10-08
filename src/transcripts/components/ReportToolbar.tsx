import { Link } from '@tanstack/react-router'
import type { ReportToolbarProps } from './ReportToolbarProps'

export function ReportToolbar({ id }: ReportToolbarProps) {
  return (
    <nav
      aria-label="Report actions"
      className="flex items-center justify-between gap-4 print:hidden"
    >
      <Link
        to="/app/transcripts/$id"
        params={{ id }}
        className="hover-underline text-sm text-muted-foreground"
      >
        Back to review
      </Link>
      <button
        type="button"
        className="quiet-action"
        onClick={() => {
          window.print()
        }}
      >
        Print
      </button>
    </nav>
  )
}
