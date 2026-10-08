import { z } from 'zod'

/** The fields of yt-dlp's info JSON this pipeline reads. */
export const VideoInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  channel: z.string().optional(),
  uploader: z.string().optional(),
  webpage_url: z.string(),
  duration: z.number(),
  upload_date: z.string(),
})
