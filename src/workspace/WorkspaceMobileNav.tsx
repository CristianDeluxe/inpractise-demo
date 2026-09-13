import { Wordmark } from '@/components/Wordmark'
import { Link } from '@tanstack/react-router'
import { WorkspaceAccount } from './WorkspaceAccount'
import { WorkspaceNav } from './WorkspaceNav'

export function WorkspaceMobileNav() {
  return (
    <div className="bg-sidebar text-sidebar-foreground lg:hidden">
      <div className="px-5 pt-4">
        <Link to="/">
          <Wordmark />
        </Link>
      </div>
      <details>
        <summary className="cursor-pointer px-5 py-4 text-sm">
          Workspace navigation
        </summary>
        <div className="p-3">
          <WorkspaceNav />
        </div>
        <WorkspaceAccount />
      </details>
    </div>
  )
}
