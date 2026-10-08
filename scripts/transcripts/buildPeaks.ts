import type { WaveformPeaks } from '@/transcripts/contracts/WaveformPeaks.ts'
import { readFileSync } from 'node:fs'
import { peakCount } from './peakCount.ts'
import { transcriptPath } from './transcriptPath.ts'
import { wavPeaks } from './wavPeaks.ts'
import { writeJsonFile } from './writeJsonFile.ts'

/** Writes work/transcripts/<id>/peaks.json from the episode's 16 kHz WAV. */
export function buildPeaks(id: string): WaveformPeaks {
  const peaks = wavPeaks(
    readFileSync(transcriptPath(id, 'audio.wav')),
    peakCount,
  )
  writeJsonFile(transcriptPath(id, 'peaks.json'), peaks)
  return peaks
}
