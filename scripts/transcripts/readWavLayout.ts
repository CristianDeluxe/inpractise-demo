import type { WavLayout } from './WavLayout.ts'

/** Walks the RIFF chunks for `fmt ` and `data`; only 16-bit PCM is accepted. */
export function readWavLayout(buffer: Buffer): WavLayout {
  if (
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WAVE'
  )
    throw new Error('Not a RIFF/WAVE file')
  let offset = 12
  let format: Omit<WavLayout, 'dataOffset' | 'dataLength'> | null = null
  while (offset + 8 <= buffer.length) {
    const id = buffer.toString('ascii', offset, offset + 4)
    const size = buffer.readUInt32LE(offset + 4)
    const body = offset + 8
    if (id === 'fmt ') {
      format = {
        channels: buffer.readUInt16LE(body + 2),
        sampleRate: buffer.readUInt32LE(body + 4),
        bitsPerSample: buffer.readUInt16LE(body + 14),
      }
    }
    if (id === 'data' && format) {
      if (format.bitsPerSample !== 16)
        throw new Error('Only 16-bit PCM WAV is supported')
      return {
        ...format,
        dataOffset: body,
        dataLength: Math.min(size, buffer.length - body),
      }
    }
    offset = body + size + (size % 2)
  }
  throw new Error('WAV file has no fmt and data chunks')
}
