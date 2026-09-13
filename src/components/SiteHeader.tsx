import { Link } from '@tanstack/react-router'
import { SiteNav } from './SiteNav'
import { Wordmark } from './Wordmark'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="page-shell flex flex-wrap items-center justify-between gap-5 py-5">
        <Link to="/" aria-label="Independent demo home">
          <Wordmark />
        </Link>
        <div className="hidden md:block">
          <SiteNav />
        </div>
        <details className="md:hidden">
          <summary className="cursor-pointer border border-border px-3 py-2 text-sm">
            Menu
          </summary>
          <div className="absolute inset-x-0 border-b border-border bg-background p-6">
            <SiteNav />
          </div>
        </details>
      </div>
    </header>
  )
}
