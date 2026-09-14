import type { TransactionSql } from 'postgres'

/**
 * Runs one statement inside a savepoint and returns the error it raised, or
 * null when it succeeded. Without the savepoint the first refusal would abort
 * the surrounding transaction and every later assertion would read
 * "current transaction is aborted" instead of the real policy message.
 */
export async function denialMessage(
  sql: TransactionSql,
  run: (scoped: TransactionSql) => Promise<unknown>,
): Promise<string | null> {
  try {
    await sql.savepoint(async (scoped) => {
      await run(scoped)
    })
  } catch (error) {
    return error instanceof Error ? error.message : String(error)
  }
  return null
}
