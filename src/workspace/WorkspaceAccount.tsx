import { useWorkspace } from '@/workspace/hooks/useWorkspace'

export function WorkspaceAccount() {
  const { access, signOut } = useWorkspace()
  return (
    <div className="border-t border-sidebar-border p-5 text-sm">
      <p className="capitalize">{access?.role}</p>
      <button
        type="button"
        className="mt-3 underline"
        onClick={() => {
          void signOut()
        }}
      >
        Sign out
      </button>
    </div>
  )
}
