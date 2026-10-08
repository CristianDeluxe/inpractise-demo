import type { TranscriptDocument } from '@/transcripts/contracts/TranscriptDocument.ts'
import { existsSync, readFileSync } from 'node:fs'
import { AsrMetaSchema } from './AsrMetaSchema.ts'
import { buildDocument } from './buildDocument.ts'
import { RawAudioSchema } from './RawAudioSchema.ts'
import { readGlossary } from './readGlossary.ts'
import { readJsonFile } from './readJsonFile.ts'
import { transcriptPath } from './transcriptPath.ts'
import { VideoInfoSchema } from './VideoInfoSchema.ts'
import { writeJsonFile } from './writeJsonFile.ts'

/** audio.json (+ audio.info.json, asr.json, glossary) to transcript.json. */
export function buildTranscript(id: string): TranscriptDocument {
  const rawPath = transcriptPath(id, 'audio.json')
  if (!existsSync(rawPath))
    throw new Error(`Missing ${rawPath}; run ingest first`)
  const document = buildDocument({
    sentences: RawAudioSchema.parse(JSON.parse(readFileSync(rawPath, 'utf8')))
      .sentences,
    info: readJsonFile(transcriptPath(id, 'audio.info.json'), VideoInfoSchema),
    asr: readJsonFile(transcriptPath(id, 'asr.json'), AsrMetaSchema),
    glossary: readGlossary(),
    transcribedAt: new Date().toISOString(),
  })
  writeJsonFile(transcriptPath(id, 'transcript.json'), document)
  return document
}
