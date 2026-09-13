import { loadTarget } from './loadTarget.ts'
import { managementQuery } from './managementQuery.ts'

export async function checkDatabasePreflight() {
  const target = loadTarget()
  const tables = await managementQuery(
    target,
    "select tablename from pg_tables where schemaname='public' order by tablename",
  )
  console.log(
    JSON.stringify(
      {
        node: process.version,
        target: 'remote',
        projectMatch: true,
        tables: tables.map((row) => row['tablename']),
        missingSeedVariables: [
          'DEMO_BASIC_PASSWORD',
          'DEMO_PREMIUM_PASSWORD',
          'DEMO_REVIEWER_PASSWORD',
          'DEMO_OTHER_PASSWORD',
        ].filter((name) => !target.values[name]),
      },
      null,
      2,
    ),
  )
}

await checkDatabasePreflight()
