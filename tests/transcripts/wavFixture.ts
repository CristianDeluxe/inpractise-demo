/** A mono 16-bit PCM WAV with the given samples (-1..1), plus a LIST chunk before data. */
export function wavFixture(
  samples: readonly number[],
  sampleRate = 16_000,
): Buffer {
  const data = Buffer.alloc(samples.length * 2)
  samples.forEach((sample, index) => {
    data.writeInt16LE(Math.round(sample * 32767), index * 2)
  })
  const fmt = Buffer.alloc(24)
  fmt.write('fmt ', 0, 'ascii')
  fmt.writeUInt32LE(16, 4)
  fmt.writeUInt16LE(1, 8)
  fmt.writeUInt16LE(1, 10)
  fmt.writeUInt32LE(sampleRate, 12)
  fmt.writeUInt32LE(sampleRate * 2, 16)
  fmt.writeUInt16LE(2, 20)
  fmt.writeUInt16LE(16, 22)
  const list = Buffer.from('LIST\u0003\u0000\u0000\u0000abc\u0000', 'binary')
  const dataHeader = Buffer.alloc(8)
  dataHeader.write('data', 0, 'ascii')
  dataHeader.writeUInt32LE(data.length, 4)
  const body = Buffer.concat([
    Buffer.from('WAVE', 'ascii'),
    fmt,
    list,
    dataHeader,
    data,
  ])
  const riff = Buffer.alloc(8)
  riff.write('RIFF', 0, 'ascii')
  riff.writeUInt32LE(body.length, 4)
  return Buffer.concat([riff, body])
}
