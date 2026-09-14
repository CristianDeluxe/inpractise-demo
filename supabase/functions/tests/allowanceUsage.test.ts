import { z } from 'zod'
import { captureResearchHandler } from './captureResearchHandler.ts'
import { providerContentFixture } from './providerContentFixture.ts'
import { runAnswerScenario } from './runAnswerScenario.ts'

Deno.test(
  'Ask debits before providers and records reported usage',
  async () => {
    const handler = await captureResearchHandler()
    const { response, requests } = await runAnswerScenario(handler, async () =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            choices: [{ message: { content: providerContentFixture() } }],
            usage: {
              prompt_tokens: 12,
              completion_tokens: 3,
              total_tokens: 15,
            },
          }),
        ),
      ),
    )
    if (response.status !== 200) throw new Error('Answer failed')
    const debit = requests.findIndex((request) =>
      request.url.endsWith('/rpc/debit_request'),
    )
    const provider = requests.findIndex(
      (request) => new URL(request.url).hostname === 'api.openai.com',
    )
    if (debit < 0 || debit >= provider)
      throw new Error('Provider ran before debit')
    const usage = requests.find((request) =>
      request.url.endsWith('/rpc/record_request_usage'),
    )
    if (!usage) throw new Error('Reported usage was not recorded')
    z.object({
      prompt: z.literal(12),
      completion: z.literal(3),
      total: z.literal(15),
    }).parse(await usage.json())
  },
)
