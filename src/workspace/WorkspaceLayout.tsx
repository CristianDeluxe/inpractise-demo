import type { PublicLayoutProps } from '@/components/PublicLayoutProps'
import { Wordmark } from '@/components/Wordmark'
import { AskBubble } from '@/research/AskBubble'
import { Link } from '@tanstack/react-router'
import { WorkspaceAccount } from './WorkspaceAccount'
import { WorkspaceBreadcrumb } from './WorkspaceBreadcrumb'
import { WorkspaceMobileNav } from './WorkspaceMobileNav'
import { WorkspaceNav } from './WorkspaceNav'

export function WorkspaceLayout({ children }: PublicLayoutProps) {
  return (
    <div className="app-shell min-h-full lg:grid lg:grid-cols-[14.5rem_minmax(0,1fr)]">
      <div className="hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground print:hidden lg:block">
        <aside className="sticky top-0 flex h-dvh flex-col overflow-y-auto">
          <div className="border-b border-sidebar-border px-5 py-4">
            <Link to="/">
              <Wordmark />
            </Link>
          </div>
          <div className="flex-1 px-3 py-4">
            <WorkspaceNav />
          </div>
          <WorkspaceAccount />
        </aside>
      </div>
      <div className="min-w-0">
        <WorkspaceMobileNav />
        <WorkspaceBreadcrumb />
        {children}
        <AskBubble />
      </div>
    </div>
  )
}
