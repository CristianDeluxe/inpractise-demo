import { loadPassage } from '@/operations/loadPassage'
import type { PassageReference } from '@/reader/PassageReference'
import { useRequest } from '@/runtime/hooks/useRequest'
import { useEffect } from 'react'

export function usePassage({
  documentId,
  revisionId,
  passageId,
}: PassageReference) {
  const request = useRequest(loadPassage)
  const { run } = request
  useEffect(() => {
    void run({ action: 'read', documentId, revisionId, passageId })
  }, [run, documentId, revisionId, passageId])
  return request
}
