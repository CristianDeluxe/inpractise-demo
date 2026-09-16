import { z } from 'zod'
import { retrievalDiagnosticsOutput } from './retrievalDiagnosticsOutput.ts'

/**
 * A compare request retrieves twice, once per side, and its ledger record
 * keeps both retrievals apart so a reviewer can see which side ran dry.
 */
export const compareDiagnosticsOutput = z.strictObject({
  interviews: retrievalDiagnosticsOutput,
  filings: retrievalDiagnosticsOutput,
})
