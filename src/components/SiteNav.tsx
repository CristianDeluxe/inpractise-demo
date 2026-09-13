import { Link } from '@tanstack/react-router'

export function SiteNav() {
  return (
    <nav
      aria-label="Primary"
      className="flex flex-wrap items-center gap-5 text-xs font-medium uppercase tracking-widest"
    >
      <Link to="/app">Library</Link>
      <a href="/#evidence">Evidence</a>
      <Link to="/connect">Connect</Link>
      <Link to="/method">Standards</Link>
      <Link to="/login" className="action">
        Log in
      </Link>
    </nav>
  )
}
