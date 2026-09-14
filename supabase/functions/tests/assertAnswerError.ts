import { z } from 'zod'
import { statusForCode } from '../_shared/http/statusForCode.ts'

export async function assertAnswerError(
  response: Response,
  code: 'invalid_model_answer' | 'dependency_failure',
) {
  if (response.status !== statusForCode(code))
    throw new Error('Incorrect HTTP error status')
  z.strictObject({
    error: z.strictObject({
      code: z.literal(code),
      message: z.string().min(1),
      retryable: z.literal(code === 'dependency_failure'),
    }),
    requestId: z.string().min(1),
  }).parse(await response.json())
}
