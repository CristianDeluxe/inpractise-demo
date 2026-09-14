import { citationSourceFixture } from '../../../tests/helpers/citationSourceFixture.ts'
import { evidenceVintage } from '../research/answer/evidenceVintage.ts'

Deno.test('reports the span and the age of both ends', () => {
  const now = new Date('2026-09-14T00:00:00Z')
  const vintage = evidenceVintage(
    [
      citationSourceFixture({ interviewDate: '2026-08-12' }),
      citationSourceFixture({ interviewDate: '2024-09-14' }),
    ],
    now,
  )
  if (vintage?.oldest !== '2024-09-14') throw new Error('Wrong oldest date')
  if (vintage.newest !== '2026-08-12') throw new Error('Wrong newest date')
  if (vintage.oldestAgeDays !== 730)
    throw new Error(`Wrong oldest age: ${String(vintage.oldestAgeDays)}`)
  if (vintage.newestAgeDays !== 33)
    throw new Error(`Wrong newest age: ${String(vintage.newestAgeDays)}`)
})

Deno.test(
  'falls back to publication date when a source has no interview date',
  () => {
    const now = new Date('2026-09-14T00:00:00Z')
    const vintage = evidenceVintage(
      [
        citationSourceFixture({
          interviewDate: null,
          publishedAt: '2025-01-02T09:00:00Z',
        }),
      ],
      now,
    )
    if (vintage?.oldest !== '2025-01-02')
      throw new Error('Publication date was not used')
  },
)

Deno.test('no sources means no vintage', () => {
  const now = new Date('2026-09-14T00:00:00Z')
  if (evidenceVintage([], now) !== undefined)
    throw new Error('Empty evidence produced a vintage')
})
