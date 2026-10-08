import { assertAudioSize } from './assertAudioSize.ts'
import { buildTranscriptRow } from './buildTranscriptRow.ts'
import type { LabAdmin } from './LabAdmin.ts'
import { labOrgs } from './labOrgs.ts'
import { transcodeAudio } from './transcodeAudio.ts'
import { uploadAudio } from './uploadAudio.ts'
import { upsertTranscriptRow } from './upsertTranscriptRow.ts'

/** Transcodes one episode, then publishes it for every organisation; a null client only reports. */
export async function publishEpisode(
  client: LabAdmin | null,
  id: string,
): Promise<void> {
  const audioPath = transcodeAudio(id)
  const audioBytes = assertAudioSize(audioPath)
  for (const orgId of labOrgs) {
    const row = buildTranscriptRow(orgId, id)
    if (client !== null) {
      await uploadAudio(client, row.audio_object, audioPath)
      await upsertTranscriptRow(client, row)
    }
    console.log(
      JSON.stringify({
        write: client !== null,
        orgId,
        transcriptId: id,
        audioObject: row.audio_object,
        audioBytes,
        correctionModel: row.correction_model,
        edits: row.edit_count,
        peaks: row.peaks !== null,
      }),
    )
  }
}
