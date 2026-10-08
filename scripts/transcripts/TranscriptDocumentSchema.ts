import { z } from 'zod'
import { TranscriptWordSchema } from './TranscriptWordSchema.ts'

/** Reader for work/transcripts/<id>/transcript.json. */
export const TranscriptDocumentSchema = z.object({
  id: z.string(),
  source: z.object({
    youtubeId: z.string(),
    title: z.string(),
    channel: z.string(),
    url: z.string(),
    durationSeconds: z.number(),
    uploadDate: z.string(),
  }),
  paragraphs: z.array(
    z.object({
      id: z.string(),
      start: z.number(),
      end: z.number(),
      words: z.array(TranscriptWordSchema),
    }),
  ),
})
