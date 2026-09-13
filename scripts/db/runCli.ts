import { spawnSync } from 'node:child_process'
import type { Target } from './Target.ts'

export function runCli(target: Target, args: string[]): void {
  const result = spawnSync('node_modules/.bin/supabase', args, {
    encoding: 'utf8',
    timeout: 120000,
    env: {
      ...process.env,
      SUPABASE_ACCESS_TOKEN: target.accessToken,
      SUPABASE_DB_PASSWORD: target.dbPassword,
    },
  })
  if (result.error) throw new Error('Supabase CLI could not be executed')
  let output = `${result.stdout}${result.stderr}`
  for (const value of Object.values(target.values))
    if (value) output = output.split(value).join('[redacted]')
  process.stdout.write(output)
  if (result.status !== 0)
    throw new Error(
      `Supabase CLI failed (exit ${String(result.status ?? 'timeout')})`,
    )
}
