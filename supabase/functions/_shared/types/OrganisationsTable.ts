import type { OrganisationsInsert } from './OrganisationsInsert.ts'
import type { OrganisationsRow } from './OrganisationsRow.ts'
import type { OrganisationsUpdate } from './OrganisationsUpdate.ts'

export type OrganisationsTable = {
  Row: OrganisationsRow
  Insert: OrganisationsInsert
  Update: OrganisationsUpdate
  Relationships: []
}
