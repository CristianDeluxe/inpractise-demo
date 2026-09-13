import { loadTarget } from './loadTarget.ts'
import { managementQuery } from './managementQuery.ts'

export async function reportDatabaseCounts(): Promise<void> {
  const counts = await managementQuery(
    loadTarget(),
    `select
 (select count(*) from public.organisations) as organisations,
 (select count(*) from public.memberships) as memberships,
 (select count(*) from auth.users) as auth_users,
 (select count(*) from public.documents) as documents,
 (select count(*) from public.document_revisions) as revisions,
 (select count(*) from public.document_revisions where is_current) as current_revisions,
 (select count(*) from public.passages) as passages,
 (select count(embedding) from public.passages) as vectors,
 (select count(*) from public.documents where document_id like 'test-%') as test_documents`,
  )
  const row = counts[0]
  if (counts.length !== 1 || !row)
    throw new Error('Database count query returned no result')
  console.log(JSON.stringify(row))
}
