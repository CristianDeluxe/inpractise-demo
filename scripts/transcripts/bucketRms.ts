import type { WavLayout } from './WavLayout.ts'

/** RMS of the first channel over `count` equal slices of the samples. */
export function bucketRms(
  buffer: Buffer,
  layout: WavLayout,
  count: number,
): number[] {
  const frameBytes = layout.channels * 2
  const frames = Math.floor(layout.dataLength / frameBytes)
  const perBucket = Math.max(1, Math.floor(frames / count))
  const levels: number[] = []
  for (let bucket = 0; bucket < count; bucket += 1) {
    const first = bucket * perBucket
    const last = Math.min(frames, first + perBucket)
    let sum = 0
    for (let frame = first; frame < last; frame += 1) {
      const sample =
        buffer.readInt16LE(layout.dataOffset + frame * frameBytes) / 32768
      sum += sample * sample
    }
    levels.push(last > first ? Math.sqrt(sum / (last - first)) : 0)
  }
  return levels
}
