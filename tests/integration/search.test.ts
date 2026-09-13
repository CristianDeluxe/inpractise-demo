import { describe, expect, it } from 'vitest'
import { assertRetrievalGate } from '../../scripts/db/assertRetrievalGate.ts'
import { classifyFailure } from '../../scripts/db/classifyFailure.ts'
import { loadCorpus } from '../../scripts/db/loadCorpus.ts'
import { loadTarget } from '../../scripts/db/loadTarget.ts'
import { readEmbedding } from '../../scripts/db/readEmbedding.ts'
import { signInPersona } from '../../scripts/db/signInPersona.ts'
import { retrieveCandidates } from '../../supabase/functions/_shared/search/retrieveCandidates.ts'
import { requireValue } from '../assertions/requireValue.ts'

describe('real FTS and pgvector retrieval', () => {
  it('finds known gold in both modes; dropping it fails the same gate', async () => {
    const { client } = await signInPersona(loadTarget(), 'basic')
    const document = loadCorpus().find((d) => d.documentId === 's1')
    const passage = document?.passages.find((p) => p.passageId === 'P2')
    expect(document).toBeDefined()
    expect(passage).toBeDefined()
    if (!document || !passage) throw new Error('Missing G01 gold')
    const artifact = readEmbedding(passage.text)
    expect(artifact).not.toBeNull()
    for (const embedding of [null, requireValue(artifact).vector]) {
      const result = await retrieveCandidates(client, {
        query: 'rebuilding integrations retraining',
        embedding,
        company: document.companySlug,
      })
      const goldIds = [`s1:${document.revisionId}:P2`]
      const diagnostic = {
        goldIds,
        candidateIds: result.diagnostics.candidateAt10,
        contextIds: result.diagnostics.selectedIds,
      }
      expect(() => {
        assertRetrievalGate(diagnostic)
      }).not.toThrow()
      const dropped = {
        ...diagnostic,
        candidateIds: diagnostic.candidateIds.filter(
          (id) => !goldIds.includes(id),
        ),
      }
      expect(classifyFailure(dropped)).toBe('retrieval_miss')
      expect(() => {
        assertRetrievalGate(dropped)
      }).toThrow('retrieval_miss')
      expect(
        result.candidates.every(
          (c) => c.orgId === 'org-a' && c.documentId !== 's6',
        ),
      ).toBe(true)
      expect(
        result.candidates.find((c) => c.key === requireValue(goldIds[0]))
          ?.vectorRank,
      ).toBe(embedding ? 1 : null)
      expect(result.diagnostics.selectedIds.length).toBeLessThanOrEqual(8)
      expect(result.diagnostics.selectedTokens).toBeLessThanOrEqual(4000)
    }
  }, 60000)
  it('rejects invalid limits, preserves exact company filters, and handles stopword-only FTS', async () => {
    const { client } = await signInPersona(loadTarget(), 'basic')
    expect(
      (
        await client.rpc('search_candidates', {
          query_text: 'migration',
          candidate_limit: 31,
        })
      ).error?.code,
    ).toBe('22023')
    expect(
      (await client.rpc('search_candidates', { query_text: 'the and of' }))
        .data,
    ).toEqual([])
    expect(
      (
        await client.rpc('search_candidates', {
          query_text: 'migration',
          company_filter: 'unknown-company',
        })
      ).data,
    ).toEqual([])
  }, 60000)
})
