import { z } from 'zod'
import type { CompareResult } from '../research/compare/CompareResult.ts'

/** The fixture pair, mapped to server-owned ids, exact citations and one relation. */
export function assertAgreeingPair(result: CompareResult) {
  z.object({
    uncovered: z.tuple([]),
    relations: z.tuple([
      z.object({
        interviewClaimId: z.literal('i1'),
        filingClaimId: z.literal('f1'),
        relation: z.literal('agrees'),
      }),
    ]),
    sides: z.object({
      interviews: z.object({
        status: z.literal('answered'),
        claims: z.tuple([
          z.object({
            claimId: z.literal('i1'),
            quote: z.literal('moved in six weeks'),
            citationIds: z.tuple([z.literal('s2:rev-1:P2')]),
          }),
        ]),
        citations: z.tuple([
          z.object({ readerPath: z.literal('/read/s2/rev-1/P2') }),
        ]),
      }),
      filings: z.object({
        status: z.literal('answered'),
        claims: z.tuple([
          z.object({
            claimId: z.literal('f1'),
            quote: z.literal('completed within one quarter'),
            citationIds: z.tuple([z.literal('f1:rev-f:B1')]),
          }),
        ]),
        citations: z.tuple([
          z.object({
            readerPath: z.literal('/read/f1/rev-f/B1'),
            kind: z.literal('sec_filing'),
          }),
        ]),
      }),
    }),
  }).parse(result)
}
