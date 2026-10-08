import { loadInterviewLibrary } from '@/operations/loadInterviewLibrary'
import { useRequest } from '@/runtime/hooks/useRequest'
import { useEffect } from 'react'

export function useInterviewLibrary() {
  const request = useRequest(loadInterviewLibrary)
  const { run } = request
  useEffect(() => {
    void run(undefined)
  }, [run])
  return request
}
