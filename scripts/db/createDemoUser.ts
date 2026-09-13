import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'

export async function createDemoUser(
  client: SupabaseClient<Database>,
  email: string,
  password: string,
): Promise<string> {
  const listed = await client.auth.admin.listUsers({ page: 1, perPage: 1000 })
  if (listed.error)
    throw new Error(`User lookup failed: ${String(listed.error.status)}`)
  const existing = listed.data.users.find((user) => user.email === email)
  if (existing) {
    if (existing.app_metadata['demo_project'] !== 'inpractise-demo')
      throw new Error('Refusing unrelated pre-existing user')
    return existing.id
  }
  if (listed.data.users.length >= 1000) throw new Error('Unexpected user count')
  const result = await client.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { demo_project: 'inpractise-demo' },
  })
  if (result.error)
    throw new Error(`User creation failed: ${String(result.error.status)}`)
  return result.data.user.id
}
