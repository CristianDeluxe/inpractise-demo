import { readFileSync } from 'node:fs'
import type { Sql } from 'postgres'
import { migrationPaths } from './migrationPaths.ts'

/**
 * Applies the real migration files, unedited. A local suite that ran against a
 * hand-written schema would prove nothing about the policies that ship.
 */
export async function applyMigrations(sql: Sql) {
  for (const path of migrationPaths())
    await sql.unsafe(readFileSync(path, 'utf8')).simple()
  return migrationPaths().length
}
