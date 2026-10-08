import { useRuntime } from '@/runtime/hooks/useRuntime'
import { useEffect, useState } from 'react'
import { classifyLabError } from './classifyLabError'
import type { LabLoader } from './LabLoader'
import type { LabResource } from './LabResource'

/** Loads one resource under the caller's session and classifies the outcome. */
export function useLabResource<A, T>(load: LabLoader<A, T>, arg: A) {
  const runtime = useRuntime()
  const [state, setState] = useState<LabResource<T>>({ status: 'loading' })
  useEffect(() => {
    let current = true
    const run = async () => {
      try {
        const data = await load(runtime, arg)
        if (current) setState({ status: 'ready', data })
      } catch (error) {
        if (current) setState(classifyLabError(error))
      }
    }
    void run()
    return () => {
      current = false
    }
  }, [load, arg, runtime])
  return state
}
