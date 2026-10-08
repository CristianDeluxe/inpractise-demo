import type { WaveformPeaks } from '@/transcripts/contracts/WaveformPeaks.ts'
import { bucketRms } from './bucketRms.ts'
import { normalizePeaks } from './normalizePeaks.ts'
import { readWavLayout } from './readWavLayout.ts'

export function wavPeaks(buffer: Buffer, count: number): WaveformPeaks {
  const layout = readWavLayout(buffer)
  const frames = layout.dataLength / (layout.channels * 2)
  return {
    durationSeconds: Math.round((frames / layout.sampleRate) * 1000) / 1000,
    peaks: normalizePeaks(bucketRms(buffer, layout, count)),
  }
}
