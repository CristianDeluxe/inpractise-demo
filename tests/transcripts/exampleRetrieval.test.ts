import { describe, expect, it } from 'vitest'
import { retrieveExamples } from '../../scripts/transcripts/retrieveExamples.ts'
import { exampleFixture } from './exampleFixture.ts'

describe('example retrieval', () => {
  const examples = [
    exampleFixture('p1', 'the harbor fund bought mango futures'),
    exampleFixture('p2', 'rain fell on the quiet harbor'),
    exampleFixture('p3', 'completely unrelated words here'),
  ]

  it('ranks by token-overlap Jaccard', () => {
    const found = retrieveExamples('harbor fund mango futures', examples, 3)
    expect(found.map((item) => item.paragraphId)).toEqual(['p1', 'p2'])
  })

  it('excludes examples with no overlap', () => {
    expect(retrieveExamples('zzz qqq', examples, 3)).toEqual([])
  })

  it('respects the limit and ignores case and punctuation', () => {
    const found = retrieveExamples('The HARBOR, fund!', examples, 1)
    expect(found).toHaveLength(1)
    expect(found[0]?.paragraphId).toBe('p1')
  })
})
