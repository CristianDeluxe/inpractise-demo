import { assertYoutubeId } from './assertYoutubeId.ts'
import { buildPeaks } from './buildPeaks.ts'

export function runPeaksCommand(argv: readonly string[]): void {
  const id = assertYoutubeId(argv[0])
  const { peaks, durationSeconds } = buildPeaks(id)
  console.log(
    `${id}: ${String(peaks.length)} peaks over ${durationSeconds.toFixed(1)} s`,
  )
}
