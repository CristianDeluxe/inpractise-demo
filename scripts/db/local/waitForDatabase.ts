import type { Sql } from 'postgres'

/** PostgreSQL accepts connections a moment after the container starts. */
export async function waitForDatabase(sql: Sql, attempts = 40) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await sql`select 1`
      return attempt
    } catch (error) {
      if (attempt === attempts) throw error
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }
  throw new Error('unreachable')
}
