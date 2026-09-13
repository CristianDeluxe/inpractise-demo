import type { MembershipsInsert } from './MembershipsInsert.ts'
import type { MembershipsRow } from './MembershipsRow.ts'
import type { MembershipsUpdate } from './MembershipsUpdate.ts'

export type MembershipsTable = {
  Row: MembershipsRow
  Insert: MembershipsInsert
  Update: MembershipsUpdate
  Relationships: [
    {
      foreignKeyName: 'memberships_org_id_fkey'
      columns: ['org_id']
      isOneToOne: false
      referencedRelation: 'organisations'
      referencedColumns: ['org_id']
    },
  ]
}
