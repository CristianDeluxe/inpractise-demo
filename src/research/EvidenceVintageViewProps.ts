import type { evidenceVintageOutput } from '@/http-api/evidenceVintageOutput'
import type { z } from 'zod'

export type EvidenceVintageViewProps = {
  vintage: z.infer<typeof evidenceVintageOutput>
}
