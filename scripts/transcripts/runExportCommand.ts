import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { assertYoutubeId } from './assertYoutubeId.ts'
import { CorrectionRunSchema } from './CorrectionRunSchema.ts'
import { defaultPairsDir } from './defaultPairsDir.ts'
import { exportPairTexts } from './exportPairTexts.ts'
import { paragraphText } from './paragraphText.ts'
import { readJsonFile } from './readJsonFile.ts'
import { readReview } from './readReview.ts'
import { TranscriptDocumentSchema } from './TranscriptDocumentSchema.ts'
import { transcriptPath } from './transcriptPath.ts'

/** Writes the reviewer's decisions as a raw/final pair under work/transcripts/pairs. */
export function runExportCommand(argv: readonly string[]): void {
  const id = assertYoutubeId(argv.find((arg) => !arg.startsWith('--')))
  const document = readJsonFile(
    transcriptPath(id, 'transcript.json'),
    TranscriptDocumentSchema,
  )
  const pair = exportPairTexts(
    id,
    document.paragraphs.map((paragraph) => ({
      id: paragraph.id,
      raw: paragraphText(paragraph),
    })),
    readJsonFile(transcriptPath(id, 'correction.json'), CorrectionRunSchema),
    readReview(id),
  )
  mkdirSync(defaultPairsDir, { recursive: true })
  writeFileSync(join(defaultPairsDir, `${id}.raw.txt`), `${pair.raw}\n`)
  writeFileSync(join(defaultPairsDir, `${id}.final.txt`), `${pair.final}\n`)
  console.log(`wrote ${join(defaultPairsDir, id)}.{raw,final}.txt`)
}
