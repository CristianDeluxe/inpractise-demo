import { useWorkspace } from '@/workspace/hooks/useWorkspace'

export function WorkspaceAccount() {
  const { access, signOut } = useWorkspace()
  return (
    <div className="border-t border-sidebar-border px-5 py-4 text-sm">
      <p className="capitalize">{access?.role}</p>
      <button
        type="button"
        className="mt-2 text-muted-foreground underline underline-offset-4 hover:text-foreground"
        onClick={() => {
          void signOut()
        }}
      >
        Sign out
      </button>
    </div>
  )
}
