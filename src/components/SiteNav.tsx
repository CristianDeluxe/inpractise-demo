import { Link } from '@tanstack/react-router'
import type { SiteNavProps } from './SiteNavProps'

export function SiteNav({ onNavigate }: SiteNavProps) {
  return (
    <nav
      aria-label={onNavigate ? 'Primary mobile' : 'Primary'}
      className="flex flex-col items-start gap-5 text-[13px] font-medium uppercase tracking-[0.12em] md:flex-row md:items-center md:gap-8"
    >
      <a
        href="/#evidence"
        onClick={onNavigate}
        className="hover-underline text-muted-foreground transition-colors hover:text-foreground"
      >
        Evidence
      </a>
      <Link
        to="/connect"
        onClick={onNavigate}
        className="hover-underline text-muted-foreground transition-colors hover:text-foreground"
      >
        Connect
      </Link>
      <Link
        to="/method"
        onClick={onNavigate}
        className="hover-underline text-muted-foreground transition-colors hover:text-foreground"
      >
        Standards
      </Link>
      <Link onClick={onNavigate} to="/login" className="action">
        Log in
      </Link>
    </nav>
  )
}
