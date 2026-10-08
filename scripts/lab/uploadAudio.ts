import { readFileSync } from 'node:fs'
import type { LabAdmin } from './LabAdmin.ts'
import { labAudioBucket } from './labAudioBucket.ts'

/** Replaces the object so a re-run publishes the newest transcode. */
export async function uploadAudio(
  client: LabAdmin,
  object: string,
  path: string,
): Promise<void> {
  const { error } = await client.storage
    .from(labAudioBucket)
    .upload(object, readFileSync(path), {
      contentType: 'audio/mp4',
      upsert: true,
    })
  if (error)
    throw new Error(`Audio upload failed for ${object}: ${error.message}`)
}
