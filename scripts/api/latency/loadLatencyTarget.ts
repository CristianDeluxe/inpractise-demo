import { readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'
import { personas } from '../../db/personas.ts'
import { requireVariable } from '../../db/requireVariable.ts'
import type { LatencyTarget } from './LatencyTarget.ts'

/**
 * The browser's own variables name the project and key; the reviewer password
 * lives in the remote file the seed scripts use. Values are loaded, never
 * printed: a missing one is reported by name. `RESEARCH_ENDPOINT` points the
 * same sign-in at a locally served function.
 */
export function loadLatencyTarget(): LatencyTarget {
  const local = parseEnv(readFileSync('.env.local', 'utf8')) as Record<
    string,
    string
  >
  const remote = parseEnv(readFileSync('.env.remote', 'utf8')) as Record<
    string,
    string
  >
  const url = requireVariable(local, 'VITE_SUPABASE_URL')
  const reviewer = personas.find((persona) => persona.name === 'demo')
  if (!reviewer) throw new Error('Unknown persona: demo')
  return {
    url,
    publishableKey: requireVariable(local, 'VITE_SUPABASE_PUBLISHABLE_KEY'),
    endpoint:
      process.env['RESEARCH_ENDPOINT'] ??
      new URL('/functions/v1/research', url).href,
    reviewerEmail: reviewer.email,
    reviewerPassword: requireVariable(remote, reviewer.passwordVariable),
  }
}
