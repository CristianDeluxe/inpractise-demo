import { loadNotebook } from '@/operations/loadNotebook'
import { useRequest } from '@/runtime/hooks/useRequest'
import { useEffect } from 'react'

export function useNotebook() {
  const request = useRequest(loadNotebook)
  const { run } = request
  useEffect(() => {
    void run({ action: 'note_list' })
  }, [run])
  return request
}
