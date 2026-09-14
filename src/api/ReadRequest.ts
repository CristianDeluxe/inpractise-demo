import type { ViewAs } from './ViewAs.ts'

export type ReadRequest = {
  viewAs?: ViewAs
  action: 'read'
  documentId: string
  revisionId: string
  passageId: string
}
