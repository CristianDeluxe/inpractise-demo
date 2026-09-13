import { callMaxLaneTool, type MaxOAuthToken } from '@cristiandeluxe/max-lane'
import type { AskResult } from './AskResult.ts'
import type { JudgeVerdict } from './JudgeVerdict.ts'
import { JudgeVerdictSchema } from './JudgeVerdictSchema.ts'
import { judgePrompt } from './judgePrompt.ts'

/**
 * A second, independent model reads the answer against its own citations. It
 * never sees the gold labels, so it cannot grade by agreement with them.
 */
export async function judgeAnswer(
  tokens: readonly MaxOAuthToken[],
  question: string,
  result: AskResult,
): Promise<JudgeVerdict> {
  const call = await callMaxLaneTool(
    {
      model: 'claude-sonnet-5',
      maxTokens: 1_000,
      systemText: judgePrompt,
      userContent: JSON.stringify({
        question,
        status: result.status,
        claims: result.claims.map((claim) => claim.text),
        missingEvidence: result.missingEvidence,
        quotedPassages: result.citations.map((citation) => citation.quote),
      }),
      tool: {
        name: 'return_verdict',
        description: 'Returns the audit verdict for one answer.',
        inputSchema: {
          type: 'object',
          required: ['grounded', 'statusAppropriate', 'reason'],
          additionalProperties: false,
          properties: {
            grounded: { type: 'boolean' },
            statusAppropriate: { type: 'boolean' },
            reason: { type: 'string', maxLength: 400 },
          },
        },
      },
    },
    tokens,
  )
  return JudgeVerdictSchema.parse(call.input)
}
