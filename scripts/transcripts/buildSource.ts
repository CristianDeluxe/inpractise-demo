import type { TranscriptSource } from '@/transcripts/contracts/TranscriptSource.ts'
import { isoUploadDate } from './isoUploadDate.ts'
import type { VideoInfo } from './VideoInfo.ts'

export function buildSource(info: VideoInfo): TranscriptSource {
  return {
    youtubeId: info.id,
    title: info.title,
    channel: info.channel ?? info.uploader ?? 'Unknown channel',
    url: info.webpage_url,
    durationSeconds: info.duration,
    uploadDate: isoUploadDate(info.upload_date),
  }
}
