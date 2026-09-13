import { randomUUID } from 'node:crypto'
import type { TransactionSql } from 'postgres'

export async function seedTransactionPrincipal(
  sql: TransactionSql,
  orgId: string,
  premium = false,
  role = 'member',
): Promise<string> {
  const userId = randomUUID()
  await sql`insert into auth.users(id) values(${userId})`
  await sql`insert into public.memberships(user_id,org_id,role,active,premium) values(${userId},${orgId},${role},true,${premium})`
  return userId
}
