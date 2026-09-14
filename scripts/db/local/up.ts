import { applyMigrations } from './applyMigrations.ts'
import { createLocalDatabase } from './createLocalDatabase.ts'
import { startContainer } from './startContainer.ts'
import { waitForDatabase } from './waitForDatabase.ts'

/** Starts the throwaway container and applies the real migrations to it. */
export async function startLocalDatabase() {
  const port = startContainer()
  const sql = createLocalDatabase()
  try {
    await waitForDatabase(sql)
    const applied = await applyMigrations(sql)
    console.log(
      `PASS: local authorization database on 127.0.0.1:${port}, ${String(applied)} SQL files applied`,
    )
  } finally {
    await sql.end()
  }
}

await startLocalDatabase()
