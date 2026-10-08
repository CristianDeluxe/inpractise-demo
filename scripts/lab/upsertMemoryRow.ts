import type { LabAdmin } from './LabAdmin.ts'
import type { MemorySnapshot } from './MemorySnapshot.ts'

export async function upsertMemoryRow(
  client: LabAdmin,
  orgId: string,
  memory: MemorySnapshot,
): Promise<void> {
  const { error } = await client
    .from('lab_memory')
    .upsert(
      { org_id: orgId, ...memory, updated_at: new Date().toISOString() },
      { onConflict: 'org_id' },
    )
  if (error)
    throw new Error(`Memory upsert failed for ${orgId}: ${error.message}`)
}
