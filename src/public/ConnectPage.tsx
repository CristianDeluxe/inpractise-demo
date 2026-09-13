import { PublicLayout } from '@/components/PublicLayout'
import { Link } from '@tanstack/react-router'
import { McpToolCards } from './McpToolCards'

export function ConnectPage() {
  return (
    <PublicLayout>
      <main id="main-content">
        <section className="ink-panel">
          <div className="page-shell py-20">
            <p className="eyebrow text-brass">Local MCP</p>
            <h1 className="display-hero mt-4 max-w-3xl">
              The same evidence, inside the tools you already work in.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              Two read-only tools search and read under the same database
              authorization as the workspace.
            </p>
          </div>
        </section>
        <McpToolCards />
        <section className="border-y border-border bg-secondary">
          <div className="page-shell py-14">
            <h2>A local process, an ordinary member</h2>
            <p className="prose-measure mt-5 text-muted-foreground">
              The repository command <code>pnpm mcp</code> starts a local stdio
              server. An operator supplies the endpoint, publishable key and
              provisioned member credentials through environment variables. No
              tool accepts an organization, user or role argument.
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              This page does not establish a connection or report connection
              status.
            </p>
          </div>
        </section>
        <section className="page-shell py-14">
          <h2>Keep the source in view</h2>
          <p className="prose-measure mt-5 text-muted-foreground">
            Synthetic companies and speakers are fictional. Public sources are
            filings. Citations retain the exact document, revision and passage
            across both clients.
          </p>
          <Link to="/app" className="action mt-8">
            Open the workspace
          </Link>
        </section>
      </main>
    </PublicLayout>
  )
}
