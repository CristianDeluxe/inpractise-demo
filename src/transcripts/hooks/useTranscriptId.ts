import { useParams } from '@tanstack/react-router'
import { z } from 'zod'

export function useTranscriptId() {
  return z.object({ id: z.string().min(1) }).parse(useParams({ strict: false }))
    .id
}
