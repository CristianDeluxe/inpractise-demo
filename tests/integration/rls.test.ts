import { createClient } from '@supabase/supabase-js'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { loadTarget } from '../../scripts/db/loadTarget.ts'
import { signInPersona } from '../../scripts/db/signInPersona.ts'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'

describe('remote direct PostgREST RLS', () => {
  it('shows every persona the podcast interviews and no hidden kind, premium included', async () => {
    const target = loadTarget()
    const hidden = ['s1', 's6', 'msft-2024', 'cost-2025', 'rr-2024']
    for (const persona of ['demo', 'basic', 'mcp']) {
      const { client } = await signInPersona(target, persona)
      const podcast = await client
        .from('passages')
        .select('document_id')
        .eq('document_id', 'pod-roche-2024')
      expect(podcast.error).toBeNull()
      expect(podcast.data?.length).toBeGreaterThan(0)
      const withheld = await client
        .from('passages')
        .select('*')
        .in('document_id', hidden)
      expect(withheld.error).toBeNull()
      expect(withheld.data).toEqual([])
      const titles = await client
        .from('documents')
        .select('document_id')
        .in('document_id', hidden)
      expect(titles.error).toBeNull()
      expect(titles.data).toEqual([])
    }
  }, 60000)
  it('isolates both organisations and prevents self-promotion', async () => {
    const target = loadTarget()
    for (const [name, orgId, foreignOrg] of [
      ['demo', 'org-a', 'org-b'],
      ['basic', 'org-a', 'org-b'],
      ['other', 'org-b', 'org-a'],
    ] as const) {
      const { client, userId } = await signInPersona(target, name)
      const own = await client.from('documents').select('org_id')
      expect(own.error).toBeNull()
      expect(own.data?.length).toBeGreaterThan(0)
      expect(own.data?.every((row) => row.org_id === orgId)).toBe(true)
      for (const table of [
        'documents',
        'document_revisions',
        'passages',
      ] as const) {
        const foreign = await client
          .from(table)
          .select('*')
          .eq('org_id', foreignOrg)
        expect(foreign.error).toBeNull()
        expect(foreign.data).toEqual([])
      }
      const write = await client
        .from('memberships')
        .update({ premium: true, role: 'reviewer' })
        .eq('user_id', userId)
      expect(write.error?.code).toBe('42501')
    }
  }, 60000)
  it('anonymous clients cannot read any table or execute retrieval', async () => {
    const target = loadTarget()
    const client = createClient<Database>(target.url, target.publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    for (const table of [
      'organisations',
      'memberships',
      'documents',
      'document_revisions',
      'passages',
    ] as const) {
      const result = await client.from(table).select('*')
      expect(result.error?.code).toBe('42501')
      expect(result.data).toBeNull()
    }
    const result = await client.rpc('search_candidates', {
      query_text: 'medicines',
    })
    expect(result.error?.code).toBe('42501')
  }, 60000)
  it('reviewer diagnostics reject basic members and count only demo-visible passages', async () => {
    const target = loadTarget()
    const basic = await signInPersona(target, 'basic')
    const denied = await basic.client.rpc('inspect_corpus')
    expect(denied.error?.code).toBe('42501')
    const demo = await signInPersona(target, 'demo')
    const allowed = await demo.client.rpc('inspect_corpus')
    expect(allowed.error).toBeNull()
    const diagnostics = z
      .object({ diagnosis: z.string(), passages: z.number() })
      .parse(allowed.data)
    expect(diagnostics.diagnosis).toBe('unclassified')
    const visible = await demo.client
      .from('passages')
      .select('*', { count: 'exact', head: true })
    expect(diagnostics.passages).toBe(visible.count)
  }, 60000)
})
