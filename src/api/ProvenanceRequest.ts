import type { ViewAs } from './ViewAs.ts'

export type ProvenanceRequest = {
  viewAs?: ViewAs
  action: 'provenance'
  requestId: string
}
