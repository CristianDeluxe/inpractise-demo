/** Where the PCM samples of a WAV file sit and how they are encoded. */
export type WavLayout = {
  readonly channels: number
  readonly sampleRate: number
  readonly bitsPerSample: number
  readonly dataOffset: number
  readonly dataLength: number
}
