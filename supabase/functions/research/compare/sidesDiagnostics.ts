import type { Json } from '../../_shared/types/Json.ts'
import type { SidesRetrieval } from './SidesRetrieval.ts'

/** Both sides' retrieval records, as the ledger stores them for one request. */
export function sidesDiagnostics(sides: SidesRetrieval): Json {
  return { interviews: sides.interviews.record, filings: sides.filings.record }
}
