import type { retrievalDiagnosticsOutput } from '@/http-api/retrievalDiagnosticsOutput'
import type { z } from 'zod'

export type DiagnosticsPanelProps = {
  diagnostics: z.infer<typeof retrievalDiagnosticsOutput>
}
