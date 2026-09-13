import type { TransactionSql } from 'postgres'
import { createDatabase } from '../../scripts/db/createDatabase.ts'
import { loadTarget } from '../../scripts/db/loadTarget.ts'

export async function withRollback(
  run: (sql: TransactionSql) => Promise<void>,
): Promise<void> {
  const sql = createDatabase(loadTarget())
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
