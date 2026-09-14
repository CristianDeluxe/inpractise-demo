import assert from 'node:assert/strict'
import { loadTarget } from './loadTarget.ts'
import { managementQuery } from './managementQuery.ts'
import { reportDatabaseCounts } from './reportDatabaseCounts.ts'

export async function verifyDatabase() {
  const rows = await managementQuery(
    loadTarget(),
    `select c.relname,c.relrowsecurity,
 has_table_privilege('anon',c.oid,'select') as anon_select,
 has_table_privilege('authenticated',c.oid,'insert,update,delete') as member_write
 from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind='r' order by c.relname`,
  )
  assert.deepEqual(
    rows.map((r) => r['relname']),
    [
      'document_revisions',
      'documents',
      'memberships',
      'organisations',
      'passages',
      'request_usage',
    ],
  )
  assert.ok(
    rows.every(
      (r) =>
        r['relrowsecurity'] === true &&
        r['anon_select'] === false &&
        r['member_write'] === false,
    ),
  )
  const routines = await managementQuery(
    loadTarget(),
    `select p.proname,p.prosecdef,has_function_privilege('anon',p.oid,'execute') as anon_execute,has_function_privilege('authenticated',p.oid,'execute') as member_execute from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname in ('search_candidates','publish_document','inspect_corpus') order by p.proname`,
  )
  assert.equal(routines.length, 3)
  assert.ok(
    routines.every(
      (r) => r['prosecdef'] === false && r['anon_execute'] === false,
    ),
  )
  assert.equal(
    routines.find((r) => r['proname'] === 'publish_document')?.[
      'member_execute'
    ],
    false,
  )
  console.log(
    'PASS: six RLS tables, default-deny anonymous grants, no member writes, caller-scoped retrieval, service-only publication',
  )
  await reportDatabaseCounts()
}

await verifyDatabase()
