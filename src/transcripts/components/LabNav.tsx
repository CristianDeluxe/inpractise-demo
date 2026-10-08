import { Link } from '@tanstack/react-router'
import { labNavLinkClass } from './labNavLinkClass'

/** The lab's two places; the current one is marked by the router. */
export function LabNav() {
  return (
    <nav aria-label="Lab" className="flex gap-1 text-sm">
      <Link
        to="/app/transcripts"
        activeOptions={{ exact: false }}
        className={labNavLinkClass}
      >
        Transcripts
      </Link>
      <Link to="/app/memory" className={labNavLinkClass}>
        Learned memory
      </Link>
    </nav>
  )
}
