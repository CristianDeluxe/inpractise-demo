import { branchRowFixture } from '../../../tests/helpers/branchRowFixture.ts'
import { readCandidatePassage } from '../_shared/search/readCandidatePassage.ts'
import { readCitationSources } from '../research/citations/readCitationSources.ts'
import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'

Deno.test(
  'candidate text cannot be loaded when its document leaves basic scope',
  async () => {
    const principal = viewAsPrincipalFixture(async (input, init) => {
      const url = new URL(new Request(input, init).url)
      if (
        url.searchParams.get('document_revisions.documents.required_tier') !==
        'eq.basic'
      )
        throw new Error('Candidate read lost scope')
      return await Promise.resolve(Response.json([]))
    })
    try {
      await readCandidatePassage(principal.client, branchRowFixture(), false)
    } catch (cause) {
      if (
        cause instanceof Error &&
        cause.message === 'Evidence access changed during retrieval'
      )
        return
      throw cause
    }
    throw new Error('Invisible candidate text was accepted')
  },
)

Deno.test(
  'citation reread drops evidence after tier changes without returning cached text',
  async () => {
    let reads = 0
    const principal = effectivePrincipal(
      viewAsPrincipalFixture(async (input, init) => {
        const url = new URL(new Request(input, init).url)
        if (url.searchParams.get('documents.required_tier') !== 'eq.basic')
          throw new Error('Citation revision lost scope')
        reads += 1
        return await Promise.resolve(Response.json([]))
      }),
      { premium: false },
    )
    const sources = await readCitationSources(principal, [
      {
        key: 'key',
        fusionScore: 1,
        orgId: 'org-a',
        documentId: 'premium',
        revisionId: 'a'.repeat(64),
        passageId: 'p1',
        text: 'Cached text must not escape.',
        tokenCount: 6,
        lexicalRank: 1,
        vectorRank: null,
        lexicalScore: 1,
        cosineDistance: null,
      },
    ])
    if (sources.length || reads !== 1)
      throw new Error('Cached citation escaped scope')
  },
)
