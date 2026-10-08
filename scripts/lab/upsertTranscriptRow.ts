import type { LabAdmin } from './LabAdmin.ts'
import type { LabTranscriptRow } from './LabTranscriptRow.ts'

export async function upsertTranscriptRow(
  client: LabAdmin,
  row: LabTranscriptRow,
): Promise<void> {
  const { error } = await client
    .from('lab_transcripts')
    .upsert(row, { onConflict: 'org_id,transcript_id' })
  if (error)
    throw new Error(
      `Transcript upsert failed for ${row.transcript_id}: ${error.message}`,
    )
}
