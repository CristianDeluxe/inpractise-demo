import type { DocumentsInsert } from './DocumentsInsert.ts'
import type { DocumentsRow } from './DocumentsRow.ts'
import type { DocumentsUpdate } from './DocumentsUpdate.ts'

export type DocumentsTable = {
  Row: DocumentsRow
  Insert: DocumentsInsert
  Update: DocumentsUpdate
  Relationships: [
    {
      foreignKeyName: 'documents_org_id_fkey'
      columns: ['org_id']
      isOneToOne: false
      referencedRelation: 'organisations'
      referencedColumns: ['org_id']
    },
  ]
}
