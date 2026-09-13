import { useParams } from '@tanstack/react-router'
import { z } from 'zod'

export function useReaderParams() {
  return z
    .object({
      documentId: z.string().min(1),
      revisionId: z.string().min(1),
      passageId: z.string().min(1),
    })
    .parse(useParams({ strict: false }))
}
