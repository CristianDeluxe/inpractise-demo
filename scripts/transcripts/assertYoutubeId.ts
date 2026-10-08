import { youtubeIdPattern } from './youtubeIdPattern.ts'

export function assertYoutubeId(value: string | undefined): string {
  if (value === undefined || !youtubeIdPattern.test(value))
    throw new Error('Expected a YouTube id matching [A-Za-z0-9_-]{6,20}')
  return value
}
