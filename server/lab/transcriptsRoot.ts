import { fileURLToPath } from 'node:url'

/** Local-only data folder; gitignored because the audio and text are copyrighted. */
export const transcriptsRoot = fileURLToPath(
  new URL('../../work/transcripts', import.meta.url),
)
