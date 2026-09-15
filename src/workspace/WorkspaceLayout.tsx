import type { PublicLayoutProps } from '@/components/PublicLayoutProps'
import { Wordmark } from '@/components/Wordmark'
import { Link } from '@tanstack/react-router'
import { ViewAsBanner } from './ViewAsBanner'
import { WorkspaceAccount } from './WorkspaceAccount'
import { WorkspaceMobileNav } from './WorkspaceMobileNav'
import { WorkspaceNav } from './WorkspaceNav'

export function WorkspaceLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-full lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="hidden flex-col bg-sidebar text-sidebar-foreground lg:sticky lg:top-[var(--app-notice-height,0px)] lg:flex lg:h-[calc(100dvh-var(--app-notice-height,0px))] lg:overflow-y-auto">
        <div className="border-b border-sidebar-border p-5">
          <Link to="/">
            <Wordmark />
          </Link>
        </div>
        <div className="flex-1 p-3">
          <WorkspaceNav />
        </div>
        <WorkspaceAccount />
      </aside>
      <div className="min-w-0">
        <WorkspaceMobileNav />
        <header className="border-b border-border bg-card px-6 py-4 text-xs text-muted-foreground">
          Workspace / Authorized research
        </header>
        <ViewAsBanner />
        {children}
      </div>
    </div>
  )
}
