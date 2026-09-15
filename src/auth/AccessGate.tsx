import { useAccess } from '@/auth/hooks/useAccess'
import { RequestFeedback } from '@/components/RequestFeedback'
import { NotebookCountProvider } from '@/notebook/NotebookCountProvider'
import { WorkspaceLayout } from '@/workspace/WorkspaceLayout'
import { WorkspaceShellSkeleton } from '@/workspace/WorkspaceShellSkeleton'
import { Outlet } from '@tanstack/react-router'
import { AccessContext } from './AccessContext'
import { SignInInvitation } from './SignInInvitation'

/**
 * Mount protected routes only after `me` succeeds, so pending or invalidated
 * access cannot leave the previous workspace visible. A local session alone is
 * insufficient; evidence requests still undergo backend authorization.
 */
export function AccessGate() {
  const access = useAccess()
  if (access.state.status === 'idle' || access.state.status === 'loading')
    return <WorkspaceShellSkeleton />
  if (access.state.status !== 'success')
    return (
      <main id="main-content" className="page-shell py-16">
        <h1 className="text-3xl">Workspace access</h1>
        <RequestFeedback
          state={access.state}
          cancel={access.cancel}
          retry={() => {
            void access.run(undefined)
          }}
        />
      </main>
    )
  if (access.state.data === null) return <SignInInvitation />
  return (
    <AccessContext value={access.state.data.data}>
      <NotebookCountProvider initial={access.state.data.data.noteCount ?? null}>
        <WorkspaceLayout>
          <Outlet />
        </WorkspaceLayout>
      </NotebookCountProvider>
    </AccessContext>
  )
}
