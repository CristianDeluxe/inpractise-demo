import { ApiError } from '../_shared/http/ApiError.ts'
import { retrieveCandidates } from '../_shared/search/retrieveCandidates.ts'
import { handleList } from '../research/actions/handleList.ts'
import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import { readNeighbourIds } from '../research/passages/readNeighbourIds.ts'
import { readPassageRow } from '../research/passages/readPassageRow.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'

Deno.test(
  'restricted library counts are database aggregates behind an inner basic-tier filter',
  async () => {
    const principal = effectivePrincipal(
      viewAsPrincipalFixture(async (input, init) => {
        const request = new Request(input, init)
        const url = new URL(request.url)
        if (
          url.searchParams.get('documents.required_tier') !== 'eq.basic' ||
          !url.searchParams.get('select')?.includes('passages(count)') ||
          !url.searchParams.get('select')?.includes('documents!inner')
        )
          throw new Error('Missing database scope or aggregate')
        if (request.headers.get('authorization') !== 'Bearer test-caller-token')
          throw new Error('Caller credentials changed')
        return await Promise.resolve(
          Response.json([
            {
              document_id: 'basic',
              passages: [{ count: 4 }],
              documents: { required_tier: 'basic' },
            },
          ]),
        )
      }),
      { premium: false },
    )
    const result = await handleList(principal, undefined, undefined)
    if (
      JSON.stringify(result) !==
      '{"items":[{"document_id":"basic","passage_count":4}]}'
    )
      throw new Error('Count was not flattened')
  },
)

Deno.test(
  'restricted retrieval chooses scoped RPC before candidate ranking and fails closed without it',
  async () => {
    const principal = viewAsPrincipalFixture(async (input, init) => {
      if (
        !new URL(new Request(input, init).url).pathname.endsWith(
          '/rpc/search_candidates_scoped',
        )
      )
        throw new Error('Used unrestricted candidate RPC')
      return await Promise.resolve(
        Response.json(
          { code: 'PGRST202', message: 'Missing scoped RPC' },
          { status: 404 },
        ),
      )
    })
    try {
      await retrieveCandidates(principal.client, {
        query: 'test',
        embedding: null,
        premium: false,
      })
    } catch (cause) {
      if (cause instanceof Error && cause.message.includes('PGRST202')) return
      throw cause
    }
    throw new Error('Missing migration silently fell back')
  },
)

Deno.test(
  'restricted passage and neighbour reads filter tiers within the database',
  async () => {
    let requests = 0
    const principal = effectivePrincipal(
      viewAsPrincipalFixture(async (input, init) => {
        const url = new URL(new Request(input, init).url)
        if (
          url.searchParams.get('document_revisions.documents.required_tier') !==
            'eq.basic' ||
          !url.searchParams
            .get('select')
            ?.includes('document_revisions!inner(documents!inner')
        )
          throw new Error('Missing nested authorization filter')
        requests += 1
        return await Promise.resolve(Response.json([]))
      }),
      { premium: false },
    )
    const ref = {
      documentId: 'premium',
      revisionId: 'a'.repeat(64),
      passageId: 'p1',
    }
    try {
      await readPassageRow(principal, ref)
      throw new Error('Premium passage returned')
    } catch (cause) {
      if (!(cause instanceof ApiError) || cause.code !== 'not_found')
        throw cause
    }
    if ((await readNeighbourIds(principal, ref, 1)).length || requests !== 2)
      throw new Error('Neighbour scope invalid')
  },
)
