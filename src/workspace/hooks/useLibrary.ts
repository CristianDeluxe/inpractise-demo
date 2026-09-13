import { loadLibrary } from '@/operations/loadLibrary'
import { useRequest } from '@/runtime/hooks/useRequest'
import { useEffect } from 'react'

export function useLibrary() {
  const request = useRequest(loadLibrary)
  const { run } = request
  useEffect(() => {
    void run(undefined)
  }, [run])
  return request
}
