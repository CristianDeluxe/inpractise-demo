import { Link } from '@tanstack/react-router'
import { SiteMobileMenu } from './SiteMobileMenu'
import { SiteNav } from './SiteNav'
import { Wordmark } from './Wordmark'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur">
      <div className="page-shell flex items-center justify-between gap-6 py-5">
        <Link to="/" aria-label="Independent demo home">
          <Wordmark />
        </Link>
        <div className="hidden md:block">
          <SiteNav />
        </div>
        <SiteMobileMenu />
      </div>
    </header>
  )
}
