import type { TransactionSql } from 'postgres'

export async function asPrincipal(
  sql: TransactionSql,
  userId: string,
): Promise<void> {
  await sql`select set_config('request.jwt.claims',${JSON.stringify({ sub: userId, role: 'authenticated' })},true)`
  await sql`set local role authenticated`
}
