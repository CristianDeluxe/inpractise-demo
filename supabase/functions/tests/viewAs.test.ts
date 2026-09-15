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
    // `me` makes exactly one database request: the caller's own notebook
    // count, answered here by its content-range header. Anything else is a
    // database access the downgraded debug must never reach.
    const real = viewAsPrincipalFixture(async (input, init) => {
      const request = new Request(input, init)
      if (
        request.method !== 'HEAD' ||
        !request.url.includes('/rest/v1/research_notes')
      )
        throw new Error('Unexpected database request')
      return await Promise.resolve(
        new Response(null, { headers: { 'content-range': '0-1/2' } }),
      )
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
        noteCount: 2,
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
