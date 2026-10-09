import { displayTitle } from '@/transcripts/episodes/displayTitle'
import { breadcrumbPages } from './breadcrumbPages'

/** Section, page and, inside one transcript, the episode, for the top bar. */
export function breadcrumbTrail(pathname: string): string[] {
  const path = pathname.replace(/\/+$/, '')
  const known = breadcrumbPages[path]
  if (known !== undefined) return [...known]
  if (path.startsWith('/read/')) return ['Research', 'Interviews', 'Excerpt']
  const transcript = /^\/app\/transcripts\/([^/]+)(\/report)?$/.exec(path)
  if (transcript?.[1] === undefined) return ['Workspace']
  const trail = [
    'Production',
    'Transcripts',
    displayTitle(transcript[1], 'Transcript'),
  ]
  return transcript[2] === undefined ? trail : [...trail, 'Report']
}
