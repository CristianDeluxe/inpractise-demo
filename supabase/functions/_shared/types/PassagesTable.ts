import type { PassagesInsert } from './PassagesInsert.ts'
import type { PassagesRow } from './PassagesRow.ts'
import type { PassagesUpdate } from './PassagesUpdate.ts'

export type PassagesTable = {
  Row: PassagesRow
  Insert: PassagesInsert
  Update: PassagesUpdate
  Relationships: [
    {
      foreignKeyName: 'passages_org_id_document_id_revision_id_fkey'
      columns: ['org_id', 'document_id', 'revision_id']
      isOneToOne: false
      referencedRelation: 'document_revisions'
      referencedColumns: ['org_id', 'document_id', 'revision_id']
    },
  ]
}
