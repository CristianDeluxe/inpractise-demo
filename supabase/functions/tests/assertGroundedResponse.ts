import { z } from 'zod'
import { citationSourceFixture } from '../../../tests/helpers/citationSourceFixture.ts'

export async function assertGroundedResponse(response: Response) {
  if (response.status !== 200)
    throw new Error('Supported answer did not succeed')
  const source = citationSourceFixture()
  z.object({
    action: z.literal('ask'),
    requestId: z.string().min(1),
    data: z.object({
      status: z.literal('answered'),
      claims: z.tuple([
        z.object({
          text: z.literal('A supported statement.'),
          citationIds: z.tuple([z.literal('s2:rev-1:P2')]),
        }),
      ]),
      citations: z.tuple([
        z.object({
          citationId: z.literal('s2:rev-1:P2'),
          documentId: z.literal(source.documentId),
          revisionId: z.literal(source.revisionId),
          passageId: z.literal(source.passageId),
          quote: z.literal(source.text),
          origin: z.literal('synthetic'),
          speaker: z.literal(source.speaker),
          readerPath: z.literal('/read/s2/rev-1/P2'),
        }),
      ]),
    }),
  }).parse(await response.json())
}
