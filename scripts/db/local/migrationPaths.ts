import { readdirSync } from 'node:fs'

/** The bootstrap shim first, then every migration in filename order. */
export function migrationPaths() {
  const directory = 'supabase/migrations'
  return [
    'scripts/db/local/bootstrap.sql',
    ...readdirSync(directory)
      .filter((name) => name.endsWith('.sql'))
      .sort()
      .map((name) => `${directory}/${name}`),
  ]
}
