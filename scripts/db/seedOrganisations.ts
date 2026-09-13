import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'

export async function seedOrganisations(
  client: SupabaseClient<Database>,
): Promise<void> {
  for (const orgId of ['org-a', 'org-b']) {
    const existing = await client
      .from('organisations')
      .select('org_id')
      .eq('org_id', orgId)
      .maybeSingle()
    if (existing.error)
      throw new Error(`Organisation lookup failed: ${existing.error.code}`)
    if (!existing.data) {
      const result = await client.from('organisations').insert({
        org_id: orgId,
        name: orgId === 'org-a' ? 'Demo Organisation A' : 'Demo Organisation B',
      })
      if (result.error)
        throw new Error(`Organisation creation failed: ${result.error.code}`)
    }
  }
}
