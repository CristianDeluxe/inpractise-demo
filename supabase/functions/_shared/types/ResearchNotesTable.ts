import type { ResearchNotesInsert } from './ResearchNotesInsert.ts'
import type { ResearchNotesRow } from './ResearchNotesRow.ts'

export type ResearchNotesTable = {
  Row: ResearchNotesRow
  Insert: ResearchNotesInsert
  Update: never
  Relationships: [
    {
      foreignKeyName: 'research_notes_org_id_document_id_revision_id_passage_id_fkey'
      columns: ['org_id', 'document_id', 'revision_id', 'passage_id']
      isOneToOne: false
      referencedRelation: 'passages'
      referencedColumns: ['org_id', 'document_id', 'revision_id', 'passage_id']
    },
  ]
}
