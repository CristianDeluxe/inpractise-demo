import { captureResearchHandler } from './captureResearchHandler.ts'
import { runAnswerScenario } from './runAnswerScenario.ts'

Deno.test(
  'failed generation retains debit and leaves usage unknown',
  async () => {
    const handler = await captureResearchHandler()
    const { requests } = await runAnswerScenario(handler, async () =>
      Promise.resolve(new Response(null, { status: 503 })),
    )
    if (
      requests.filter((request) => request.url.endsWith('/rpc/debit_request'))
        .length !== 1
    )
      throw new Error('Missing debit')
    if (
      requests.some((request) =>
        request.url.endsWith('/rpc/record_request_usage'),
      )
    )
      throw new Error('Fabricated usage after failure')
  },
)
