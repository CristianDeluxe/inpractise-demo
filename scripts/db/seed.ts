import { createAdmin } from './createAdmin.ts'
import { createDemoUser } from './createDemoUser.ts'
import { loadTarget } from './loadTarget.ts'
import { personas } from './personas.ts'
import { requireVariable } from './requireVariable.ts'
import { seedOrganisations } from './seedOrganisations.ts'

export async function seedDatabase() {
  const target = loadTarget()
  const missing = personas
    .map((p) => p.passwordVariable)
    .filter((name) => !target.values[name])
  if (missing.length)
    throw new Error(`Missing variables: ${missing.join(', ')}`)
  const client = createAdmin(target)
  await seedOrganisations(client)
  for (const persona of personas) {
    const userId = await createDemoUser(
      client,
      persona.email,
      requireVariable(target.values, persona.passwordVariable),
    )
    const result = await client.from('memberships').upsert(
      {
        user_id: userId,
        org_id: persona.orgId,
        role: persona.role,
        active: true,
        premium: persona.premium,
      },
      { onConflict: 'user_id', ignoreDuplicates: true },
    )
    if (result.error)
      throw new Error(`Membership seed failed: ${result.error.code}`)
    console.log(`${persona.name}: ${persona.email}`)
  }
}

await seedDatabase()
