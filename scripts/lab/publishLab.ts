import { loadTarget } from '../db/loadTarget.ts'
import { createLabAdmin } from './createLabAdmin.ts'
import { labOrgs } from './labOrgs.ts'
import { listEpisodeIds } from './listEpisodeIds.ts'
import { publishEpisode } from './publishEpisode.ts'
import { readMemorySnapshot } from './readMemorySnapshot.ts'
import { upsertMemoryRow } from './upsertMemoryRow.ts'

/**
 * Publishes the gitignored episodes to Supabase. Review decisions are never
 * uploaded; reviews start empty in the database. `--dry-run` transcodes
 * locally and prints what would be written without touching the network.
 */
export async function publishLab() {
  const dryRun = process.argv.includes('--dry-run')
  const client = dryRun ? null : createLabAdmin(loadTarget())
  const ids = listEpisodeIds()
  if (ids.length === 0)
    throw new Error('No episode with a transcript.json found')
  for (const id of ids) await publishEpisode(client, id)
  const memory = readMemorySnapshot()
  for (const orgId of labOrgs) {
    if (client !== null) await upsertMemoryRow(client, orgId, memory)
    console.log(
      JSON.stringify({
        write: client !== null,
        orgId,
        memory: {
          glossaryEntries: memory.glossary.length,
          examples: memory.example_count,
        },
      }),
    )
  }
  console.log(
    JSON.stringify({
      dryRun,
      episodes: ids.length,
      organisations: labOrgs.length,
    }),
  )
}

await publishLab()
