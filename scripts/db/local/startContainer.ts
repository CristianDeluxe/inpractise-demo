import { execFileSync } from 'node:child_process'
import { localContainerName } from './localContainerName.ts'
import { localDatabaseUrl } from './localDatabaseUrl.ts'

/**
 * Starts a throwaway PostgreSQL with pgvector on a port of this repository's
 * own, so a Supabase stack belonging to another project keeps its default
 * 54322. A container left over from an earlier run is replaced, never reused:
 * the suite must start from an empty database.
 */
export function startContainer() {
  const port = new URL(localDatabaseUrl()).port || '5432'
  execFileSync('docker', ['rm', '-f', localContainerName], { stdio: 'ignore' })
  execFileSync('docker', [
    'run',
    '--detach',
    '--name',
    localContainerName,
    '--env',
    'POSTGRES_PASSWORD=postgres',
    '--publish',
    `127.0.0.1:${port}:5432`,
    'pgvector/pgvector:pg17',
  ])
  return port
}
