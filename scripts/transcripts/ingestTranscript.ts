import { existsSync, mkdirSync } from 'node:fs'
import { asrModel } from './asrModel.ts'
import { buildTranscript } from './buildTranscript.ts'
import { ingestStep } from './ingestStep.ts'
import { transcriptPath } from './transcriptPath.ts'
import { writeJsonFile } from './writeJsonFile.ts'

/** download, resample, transcribe (each skipped if its output exists), then build. */
export async function ingestTranscript(id: string): Promise<void> {
  const dir = transcriptPath(id, '')
  mkdirSync(dir, { recursive: true })
  await ingestStep('download', transcriptPath(id, 'audio.m4a'), 'yt-dlp', [
    '-f',
    'bestaudio',
    '-x',
    '--audio-format',
    'm4a',
    '-o',
    transcriptPath(id, 'audio.%(ext)s'),
    '--write-info-json',
    `https://www.youtube.com/watch?v=${id}`,
  ])
  await ingestStep('resample', transcriptPath(id, 'audio.wav'), 'ffmpeg', [
    '-y',
    '-i',
    transcriptPath(id, 'audio.m4a'),
    '-ar',
    '16000',
    '-ac',
    '1',
    transcriptPath(id, 'audio.wav'),
  ])
  if (!existsSync(transcriptPath(id, 'audio.json'))) {
    const started = Date.now()
    await ingestStep('asr', transcriptPath(id, 'audio.json'), 'parakeet-mlx', [
      transcriptPath(id, 'audio.wav'),
      '--model',
      asrModel,
      '--output-format',
      'json',
      '--output-dir',
      dir,
    ])
    writeJsonFile(transcriptPath(id, 'asr.json'), {
      model: asrModel,
      seconds: Math.round((Date.now() - started) / 1000),
    })
  }
  console.log(
    `built ${String(buildTranscript(id).paragraphs.length)} paragraphs`,
  )
}
