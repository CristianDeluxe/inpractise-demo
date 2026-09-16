import type { retrievalDiagnosticsOutput } from '@/http-api/retrievalDiagnosticsOutput'
import type { z } from 'zod'

export type RecentRequestDiagnosticsProps = {
  label?: string
  diagnostics: z.infer<typeof retrievalDiagnosticsOutput>
  generatedTokens: number | null
}
