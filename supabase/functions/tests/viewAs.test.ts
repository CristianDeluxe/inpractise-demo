import { ApiError } from '../_shared/http/ApiError.ts'
import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import { RequestSchema } from '../research/RequestSchema.ts'
import { routeAction } from '../research/routeAction.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'

Deno.test(
  'view-as intersects permissions while preserving identity and caller client',
  () => {
    const real = viewAsPrincipalFixture()
    const effective = effectivePrincipal(real, {
      role: 'member',
      premium: false,
    })
    if (
      effective.role !== 'member' ||
      effective.premium ||
      effective.client !== real.client ||
      effective.userId !== real.userId ||
      effective.orgId !== real.orgId
    )
      throw new Error('Downgrade changed identity or failed to narrow')
    if (real.role !== 'reviewer' || !real.premium)
      throw new Error('Real membership mutated')
    const member = { ...real, role: 'member', premium: false }
    const same = effectivePrincipal(member, { role: 'member' })
    if (same.role !== member.role || same.premium !== member.premium)
      throw new Error('Member permissions changed')
  },
)

Deno.test('all actions reject view-as escalation and identity claims', () => {
  for (const action of ['me', 'list', 'read', 'search', 'ask', 'debug']) {
    const fields =
      action === 'read'
        ? { documentId: 'test', revisionId: 'a'.repeat(64), passageId: 'p1' }
        : action === 'search' || action === 'ask'
          ? { query: 'test query' }
          : {}
    for (const viewAs of [
      { role: 'reviewer' },
      { premium: true },
      { orgId: 'other' },
      { role: 'member', userId: 'other' },
    ]) {
      if (RequestSchema.safeParse({ action, ...fields, viewAs }).success)
        throw new Error('Escalation passed schema')
    }
    if (
      !RequestSchema.safeParse({
        action,
        ...fields,
        viewAs: { role: 'member', premium: false },
      }).success
    )
      throw new Error('Valid downgrade rejected')
  }
})

Deno.test(
  'me retains real access and downgraded debug refuses before database access',
  async () => {
    const real = viewAsPrincipalFixture(() => {
      throw new Error('Unexpected database request')
    })
    const me = await routeAction(real, {
      action: 'me',
      viewAs: { role: 'member', premium: false },
    })
    if (
      JSON.stringify(me) !==
      JSON.stringify({
        orgId: 'org-a',
        role: 'member',
        premium: false,
        realPrincipal: { orgId: 'org-a', role: 'reviewer', premium: true },
        effectivePrincipal: { orgId: 'org-a', role: 'member', premium: false },
      })
    )
      throw new Error('Identity response invalid')
    try {
      await routeAction(real, { action: 'debug', viewAs: { role: 'member' } })
    } catch (cause) {
      if (cause instanceof ApiError && cause.code === 'forbidden') return
      throw cause
    }
    throw new Error('Restricted debug was accepted')
  },
)
