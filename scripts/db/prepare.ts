import { loadTarget } from './loadTarget.ts'
import { managementQuery } from './managementQuery.ts'
import { runCli } from './runCli.ts'

export async function prepareDatabase() {
  const target = loadTarget()
  const rows = await managementQuery(
    target,
    "select tablename from pg_tables where schemaname='public'",
  )
  if (
    rows.some(
      (row) =>
        ![
          'organisations',
          'memberships',
          'documents',
          'document_revisions',
          'passages',
        ].includes(String(row['tablename'])),
    )
  )
    throw new Error('Unexpected public tables; refusing migration')
  runCli(target, ['--version'])
  runCli(target, ['link', '--project-ref', target.projectRef])
  runCli(target, ['db', 'push', '--linked', '--dry-run'])
  if (!process.argv.includes('--dry-run'))
    runCli(target, ['db', 'push', '--linked', '--yes'])
}

await prepareDatabase()
