import { useEffect, useState } from 'react'
import { classifyLabError } from './classifyLabError'
import type { LabResource } from './LabResource'

/** Loads one resource from the local lab API and classifies the outcome. */
export function useLabResource<A, T>(load: (arg: A) => Promise<T>, arg: A) {
  const [state, setState] = useState<LabResource<T>>({ status: 'loading' })
  useEffect(() => {
    let current = true
    const run = async () => {
      try {
        const data = await load(arg)
        if (current) setState({ status: 'ready', data })
      } catch (error) {
        if (current) setState(classifyLabError(error))
      }
    }
    void run()
    return () => {
      current = false
    }
  }, [load, arg])
  return state
}
