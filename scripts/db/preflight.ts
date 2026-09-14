import { loadTarget } from './loadTarget.ts'
import { managementQuery } from './managementQuery.ts'
import { personas } from './personas.ts'

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
        missingSeedVariables: personas
          .map((persona) => persona.passwordVariable)
          .filter((name) => !target.values[name]),
      },
      null,
      2,
    ),
  )
}

await checkDatabasePreflight()
