import type { CorrectionRun } from '@/transcripts/contracts/CorrectionRun.ts'
import type { TranscriptDocument } from '@/transcripts/contracts/TranscriptDocument.ts'
import { readFileSync } from 'node:fs'
import { assertYoutubeId } from './assertYoutubeId.ts'
import { transcriptPath } from './transcriptPath.ts'
import { withFillerEdits } from './withFillerEdits.ts'
import { writeJsonFile } from './writeJsonFile.ts'

for (const id of process.argv.slice(2)) {
  assertYoutubeId(id)
  const read = (file: string): unknown =>
    JSON.parse(readFileSync(transcriptPath(id, file), 'utf8'))
  const run = read('correction.json') as CorrectionRun
  const next = withFillerEdits(
    read('transcript.json') as TranscriptDocument,
    run,
  )
  const count = next.paragraphs
    .flatMap((p) => p.edits)
    .filter((e) => e.origin === 'rule').length
  writeJsonFile(transcriptPath(id, 'correction.json'), next)
  console.log(`${id}: ${String(count)} filler rule edits`)
}
