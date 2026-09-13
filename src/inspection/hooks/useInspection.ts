import { loadInspection } from '@/operations/loadInspection'
import { useRequest } from '@/runtime/hooks/useRequest'
import { useEffect } from 'react'

export function useInspection() {
  const request = useRequest(loadInspection)
  const { run } = request
  useEffect(() => {
    void run(undefined)
  }, [run])
  return request
}
