import type { TransactionSql } from 'postgres'
import { seedDocument } from './seedDocument.ts'

/**
 * Two organizations, and inside the first a basic and a premium document. This
 * is the smallest shape that can tell organization isolation and tier gating
 * apart.
 */
export async function seedAuthorizationFixture(sql: TransactionSql) {
  await sql`insert into public.organisations(org_id,name) values('org-a','Org A'),('org-b','Org B')`
  await seedDocument(sql, 'org-a', 'basic-doc', 'basic')
  await seedDocument(sql, 'org-a', 'premium-doc', 'premium')
  await seedDocument(sql, 'org-b', 'other-doc', 'basic')
}
