import { expect, it } from 'vitest'
import { filteredInterviewIdsFixture } from './filteredInterviewIdsFixture'

it('keeps everything without a filter', () => {
  expect(filteredInterviewIdsFixture('', '  ')).toEqual(['a', 'b'])
})
it('filters by company and by case-insensitive title text', () => {
  expect(filteredInterviewIdsFixture('Acme', '')).toEqual(['b'])
  expect(filteredInterviewIdsFixture('', 'PRIC')).toEqual(['a'])
  expect(filteredInterviewIdsFixture('Acme', 'pric')).toEqual([])
})
