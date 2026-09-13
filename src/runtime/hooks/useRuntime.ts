import { RuntimeContext } from '@/runtime/RuntimeContext'
import { useContext } from 'react'

export function useRuntime() {
  const runtime = useContext(RuntimeContext)
  if (!runtime) throw new Error('Browser configuration is unavailable.')
  return runtime
}
