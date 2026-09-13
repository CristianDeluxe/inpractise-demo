import { Link } from '@tanstack/react-router'
import { Wordmark } from './Wordmark'
import { demoNotice } from './disclosureText'

export function SiteFooter() {
  return (
    <footer className="ink-panel border-t border-ink-border py-12">
      <div className="page-shell grid gap-8 md:grid-cols-2">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-md text-sm text-ink-muted">{demoNotice}</p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-start gap-6 text-sm"
        >
          <Link to="/app" className="hover-underline">
            Workspace
          </Link>
          <Link to="/method" className="hover-underline">
            Standards
          </Link>
          <Link to="/connect" className="hover-underline">
            Local MCP
          </Link>
        </nav>
        <p className="text-xs text-ink-muted md:col-span-2">
          An independent engineering demonstration. No affiliation with In
          Practise.
        </p>
      </div>
    </footer>
  )
}
