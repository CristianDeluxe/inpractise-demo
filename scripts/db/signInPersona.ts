import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'
import type { Target } from './Target.ts'
import { personas } from './personas.ts'

export async function signInPersona(target: Target, name: string) {
  const persona = personas.find((p) => p.name === name)
  if (!persona) throw new Error('Unknown persona')
  const password = target.values[persona.passwordVariable]
  if (!password)
    throw new Error(`Missing variables: ${persona.passwordVariable}`)
  const client = createClient<Database>(target.url, target.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: async (input, init) =>
        fetch(input, { ...init, signal: AbortSignal.timeout(20000) }),
    },
  })
  const result = await client.auth.signInWithPassword({
    email: persona.email,
    password,
  })
  if (result.error) throw new Error(`Persona sign-in failed: ${name}`)
  return {
    client,
    userId: result.data.user.id,
    token: result.data.session.access_token,
  }
}
