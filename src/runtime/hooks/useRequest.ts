import type { Operation } from '@/runtime/Operation'
import type { RequestState } from '@/runtime/RequestState'
import { useRuntime } from '@/runtime/hooks/useRuntime'
import { requestFailure } from '@/runtime/requestFailure'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Only the latest controller may publish state, even if an operation ignores abort.
 * Shared controller registration lets access changes cancel work across components.
 * Cancellation suppresses delivery; it cannot guarantee server work or an Ask
 * debit was undone.
 */
export function useRequest<A, T>(operation: Operation<A, T>) {
  const runtime = useRuntime()
  const last = useRef<{ args: A } | null>(null)
  const active = useRef<AbortController | null>(null)
  const [state, setState] = useState<RequestState<T>>({ status: 'idle' })
  const cancel = useCallback(() => {
    active.current?.abort()
    active.current = null
    setState({ status: 'cancelled' })
  }, [])
  useEffect(
    () => () => {
      active.current?.abort()
      active.current = null
    },
    [],
  )
  const run = useCallback(
    async (args: A) => {
      last.current = { args }
      active.current?.abort()
      const controller = new AbortController()
      active.current = controller
      runtime.controllers.add(controller)
      setState({ status: 'loading' })
      try {
        const data = await operation(runtime, args, controller.signal)
        if (active.current === controller && !controller.signal.aborted)
          setState({ status: 'success', data })
      } catch (error) {
        if (active.current !== controller || controller.signal.aborted) return
        setState(requestFailure(runtime, error))
      } finally {
        runtime.controllers.delete(controller)
      }
    },
    [operation, runtime],
  )
  const retry = () => {
    if (last.current) void run(last.current.args)
  }
  return { state, run, cancel, retry }
}
