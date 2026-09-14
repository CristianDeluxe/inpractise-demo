import { loadProvenance } from '@/operations/loadProvenance'
import { useRequest } from '@/runtime/hooks/useRequest'
import { useEffect } from 'react'

export function useProvenance(requestId: string) {
  const request = useRequest(loadProvenance)
  const { run } = request
  useEffect(() => {
    void run({ action: 'provenance', requestId })
  }, [run, requestId])
  return request
}
