import { loadAccess } from '@/operations/loadAccess'
import { cancelRequests } from '@/runtime/cancelRequests'
import { useRequest } from '@/runtime/hooks/useRequest'
import { useRuntime } from '@/runtime/hooks/useRuntime'
import { useEffect } from 'react'

export function useAccess() {
  const runtime = useRuntime()
  const request = useRequest(loadAccess)
  const { run, cancel } = request
  useEffect(() => {
    let mounted = true
    const observedSession = new Set<string | null>()
    const invalidate = () => {
      cancelRequests(runtime)
      cancel()
    }
    const { data } = runtime.auth.onAuthStateChange((_event, session) => {
      const token = session?.access_token ?? null
      if (observedSession.has(token)) return
      observedSession.clear()
      observedSession.add(token)
      invalidate()
      // Leave the synchronous Auth callback before reading its session again.
      queueMicrotask(() => {
        if (mounted) void run(undefined)
      })
    })
    runtime.events.addEventListener('invalid-session', invalidate)
    void run(undefined)
    return () => {
      mounted = false
      data.subscription.unsubscribe()
      runtime.events.removeEventListener('invalid-session', invalidate)
      cancelRequests(runtime)
    }
  }, [runtime, run, cancel])
  return request
}
