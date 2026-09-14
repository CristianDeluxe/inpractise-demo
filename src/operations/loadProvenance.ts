import { provenance } from '@/api/provenance'
import type { ProvenanceRequest } from '@/api/ProvenanceRequest'
import { parseProvenanceData } from '@/contracts/parseProvenanceData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function loadProvenance(
  runtime: BrowserRuntime,
  args: ProvenanceRequest,
  signal: AbortSignal,
) {
  return provenance(runtime.client, args, parseProvenanceData, { signal })
}
