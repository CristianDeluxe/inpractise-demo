import { writeDocument } from './writeDocument.mjs'

export async function createRevisionFixtures(root, core) {
  const corrected = structuredClone(core.documents[4])
  corrected.publishedAt = '2026-09-01T09:00:00Z'
  corrected.turns[1].text =
    'The corrected fictional January 2026 example has processing revenue of USD 100,000 on 2,000,000 transactions.'
  const foreign = structuredClone(core.documents[5])
  foreign.turns[1].text = foreign.turns[1].text.replace('ORCHID-74', 'CEDAR-29')
  return [
    await writeDocument(root, corrected, corrected.turns, {
      extra: {
        fixturePurpose:
          'G14 revision regression; import only in isolated tests',
        revisionLabel: 'v2',
        organizationScope: null,
        rights: {
          status: 'approved',
          basis:
            'Exact revision test variant supplied in specification 05 section 2.',
          policyUrl: null,
        },
      },
      directory: 'corpus/fixtures/normalised',
      stem: 's5-v2',
    }),
    await writeDocument(root, foreign, foreign.turns, {
      extra: {
        fixturePurpose:
          'G11 organization isolation; never send to a provider or public assets',
        revisionLabel: 'v1-org-b',
        organizationScope: 'b',
        rights: {
          status: 'approved',
          basis:
            'Exact organization isolation variant supplied in specification 05 section 2.',
          policyUrl: null,
        },
      },
      directory: 'corpus/fixtures/normalised',
      stem: 's6-org-b',
    }),
  ]
}
