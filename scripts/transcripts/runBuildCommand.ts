import { assertYoutubeId } from './assertYoutubeId.ts'
import { buildTranscript } from './buildTranscript.ts'

export function runBuildCommand(argv: readonly string[]): void {
  const document = buildTranscript(assertYoutubeId(argv[0]))
  const { stats } = document
  console.log(
    `${document.id}: ${String(document.paragraphs.length)} paragraphs, ${String(stats.words)} words ` +
      `(high ${String(stats.high)}, medium ${String(stats.medium)}, low ${String(stats.low)}), ${String(stats.flagged)} flagged`,
  )
}
