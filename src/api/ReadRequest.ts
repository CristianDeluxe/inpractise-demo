export type ReadRequest = {
  action: 'read'
  documentId: string
  revisionId: string
  passageId: string
}
