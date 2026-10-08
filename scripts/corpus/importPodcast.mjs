import { assertRuntime } from './assertRuntime.mjs'
import { createPodcastRecord } from './createPodcastRecord.mjs'
import { PODCAST_GUESTS } from './podcastGuests.mjs'
import { readJson } from './readJson.mjs'
import { writeJson } from './writeJson.mjs'

try {
  const root = await assertRuntime()
  for (const [youtubeId, identity] of Object.entries(PODCAST_GUESTS)) {
    const folder = `${root}/work/transcripts/${youtubeId}`
    const transcript = await readJson(`${folder}/transcript.json`)
    const speakers = await readJson(`${folder}/speakers.json`)
    const record = createPodcastRecord(identity, transcript, speakers)
    await writeJson(`${root}/corpus/podcasts/${youtubeId}.json`, record)
    console.log(
      `PODCAST: ${youtubeId} ${record.documentId} ${record.turns.length} turns`,
    )
  }
} catch (error) {
  console.error(`PODCAST_IMPORT_FAILED${error.code ? ` ${error.code}` : ''}`)
  process.exitCode = 1
}
