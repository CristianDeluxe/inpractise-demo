import type { DocumentRevisionsInsert } from './DocumentRevisionsInsert.ts'
import type { DocumentRevisionsRow } from './DocumentRevisionsRow.ts'
import type { DocumentRevisionsUpdate } from './DocumentRevisionsUpdate.ts'

export type DocumentRevisionsTable = {
  Row: DocumentRevisionsRow
  Insert: DocumentRevisionsInsert
  Update: DocumentRevisionsUpdate
  Relationships: [
    {
      foreignKeyName: 'document_revisions_org_id_document_id_fkey'
      columns: ['org_id', 'document_id']
      isOneToOne: false
      referencedRelation: 'documents'
      referencedColumns: ['org_id', 'document_id']
    },
  ]
}
