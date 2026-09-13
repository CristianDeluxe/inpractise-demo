import { Link } from '@tanstack/react-router'

export function SiteNav() {
  return (
    <nav
      aria-label="Primary"
      className="flex flex-wrap items-center gap-5 text-xs font-medium uppercase tracking-widest"
    >
      <Link to="/app" className="hover-underline">
        Library
      </Link>
      <a href="/#evidence" className="hover-underline">
        Evidence
      </a>
      <Link to="/connect" className="hover-underline">
        Connect
      </Link>
      <Link to="/method" className="hover-underline">
        Standards
      </Link>
      <Link to="/login" className="action">
        Log in
      </Link>
    </nav>
  )
}
