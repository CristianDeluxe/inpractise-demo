import { readFileSync, realpathSync } from 'node:fs'
import { parseEnv } from 'node:util'
import { requireVariable } from './requireVariable.ts'
import type { Target } from './Target.ts'

export function loadTarget(): Target {
  if (realpathSync(process.cwd()) !== '/Users/cristiandeluxe/p/inpractise-demo')
    throw new Error('Run from the dedicated inpractise-demo repository')
  const values = parseEnv(readFileSync('.env.remote', 'utf8')) as Record<
    string,
    string
  >
  const url = requireVariable(values, 'SUPABASE_URL')
  const projectRef = requireVariable(values, 'SUPABASE_PROJECT_REF')
  const publishableKey = requireVariable(values, 'SUPABASE_PUBLISHABLE_KEY')
  const secretKey = requireVariable(values, 'SUPABASE_SECRET_KEY')
  const dbPassword = requireVariable(values, 'SUPABASE_DB_PASSWORD')
  const accessToken = requireVariable(values, 'SUPABASE_ACCESS_TOKEN')
  if (
    !/^[a-z]{20}$/.test(projectRef) ||
    url !== `https://${projectRef}.supabase.co`
  )
    throw new Error('Dedicated project URL/ref mismatch')
  return {
    url: url,
    projectRef: projectRef,
    publishableKey: publishableKey,
    secretKey: secretKey,
    dbPassword: dbPassword,
    accessToken: accessToken,
    openaiKey: values['OPENAI_API_KEY'] ?? '',
    values,
  }
}
