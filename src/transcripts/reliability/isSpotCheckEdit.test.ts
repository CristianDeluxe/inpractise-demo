import { editFixture } from '@/transcripts/fixtures/editFixture'
import { describe, expect, it } from 'vitest'
import { isSpotCheckEdit } from './isSpotCheckEdit'

describe('isSpotCheckEdit', () => {
  it('offers edits below the reliable threshold for spot-checking', () => {
    const at = (confidence: number) =>
      editFixture('e1', 'a', 'b', { confidence })
    expect(isSpotCheckEdit(at(0.89))).toBe(true)
    expect(isSpotCheckEdit(at(0.9))).toBe(false)
  })
})
