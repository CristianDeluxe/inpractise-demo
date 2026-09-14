import { useWorkspace } from '@/workspace/hooks/useWorkspace'
import { ViewAsSelector } from './ViewAsSelector'

export function WorkspaceAccount() {
  const { access, signOut } = useWorkspace()
  return (
    <div className="border-t border-sidebar-border p-5 text-sm">
      <p className="capitalize">
        {access?.premium ? 'Premium' : 'Standard'} · {access?.role}
      </p>
      <p className="mt-2 break-all font-mono text-xs text-sidebar-foreground/65">
        {access?.orgId}
      </p>
      <ViewAsSelector />
      <button
        type="button"
        className="mt-5 underline"
        onClick={() => {
          void signOut()
        }}
      >
        Sign out
      </button>
    </div>
  )
}
