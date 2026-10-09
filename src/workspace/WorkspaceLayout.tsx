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
    <div className="min-h-full lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <div className="hidden bg-sidebar text-sidebar-foreground print:hidden lg:block">
        <aside className="sticky top-0 flex h-dvh flex-col overflow-y-auto">
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
