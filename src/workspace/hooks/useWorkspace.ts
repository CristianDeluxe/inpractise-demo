import { AccessContext } from '@/auth/AccessContext'
import { signOut } from '@/auth/signOut'
import { useRuntime } from '@/runtime/hooks/useRuntime'
import { useContext } from 'react'

export function useWorkspace() {
  const access = useContext(AccessContext)
  const runtime = useRuntime()
  const logout = async () => {
    try {
      await signOut(runtime)
    } catch {
      runtime.events.dispatchEvent(new Event('invalid-session'))
    }
  }
  return { access, signOut: logout }
}
