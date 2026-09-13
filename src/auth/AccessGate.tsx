import { useAccess } from '@/auth/hooks/useAccess'
import { RequestFeedback } from '@/components/RequestFeedback'
import { WorkspaceLayout } from '@/workspace/WorkspaceLayout'
import { Outlet } from '@tanstack/react-router'
import { AccessContext } from './AccessContext'
import { SignInInvitation } from './SignInInvitation'

export function AccessGate() {
  const access = useAccess()
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
      <WorkspaceLayout>
        <Outlet />
      </WorkspaceLayout>
    </AccessContext>
  )
}
