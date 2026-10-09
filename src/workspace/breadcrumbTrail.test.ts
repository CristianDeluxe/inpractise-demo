import { describe, expect, it } from 'vitest'
import { breadcrumbTrail } from './breadcrumbTrail'

describe('breadcrumbTrail', () => {
  it('names the section and the page', () => {
    expect(breadcrumbTrail('/app/cost')).toEqual(['Production', 'Cost'])
    expect(breadcrumbTrail('/app/')).toEqual(['Research', 'Interviews'])
  })
  it('names the episode inside a transcript and its report', () => {
    const title = 'Roche CEO Thomas Schinecker on In Good Company'
    expect(breadcrumbTrail('/app/transcripts/LQ6lAvNMjPE')).toEqual([
      'Production',
      'Transcripts',
      title,
    ])
    expect(breadcrumbTrail('/app/transcripts/LQ6lAvNMjPE/report')).toEqual([
      'Production',
      'Transcripts',
      title,
      'Report',
    ])
  })
  it('falls back to a generic title for an unknown episode', () => {
    expect(breadcrumbTrail('/app/transcripts/other')[2]).toBe('Transcript')
  })
})
