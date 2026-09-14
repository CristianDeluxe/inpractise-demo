import type { TransactionSql } from 'postgres'
import { createLocalDatabase } from '../../scripts/db/local/createLocalDatabase.ts'

/**
 * Every case runs inside one transaction that is always rolled back, so the
 * suite is order-independent and leaves the container as it found it.
 */
export async function withLocalRollback(
  run: (sql: TransactionSql) => Promise<void>,
): Promise<void> {
  const sql = createLocalDatabase()
  const rollback = new Error('ROLLBACK_SUCCESS')
  try {
    await sql.begin(async (transaction) => {
      await run(transaction)
      throw rollback
    })
  } catch (error) {
    if (error !== rollback) throw error
  } finally {
    await sql.end()
  }
}
