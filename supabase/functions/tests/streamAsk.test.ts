import { runStreamScenario } from './runStreamScenario.ts'

Deno.test(
  'the streaming transport ends in exactly one terminal event',
  async (t) => {
    await t.step(
      'it announces an event stream for the caller organisation',
      async () => {
        const { response } = await runStreamScenario(undefined)
        const type = response.headers.get('content-type') ?? ''
        if (!type.startsWith('text/event-stream'))
          throw new Error(`Unexpected content type: ${type}`)
        if (!response.headers.get('x-research-org-id'))
          throw new Error('The stream carried no organisation scope')
      },
    )
    await t.step(
      'stages precede one result, and nothing follows it',
      async () => {
        const { frames } = await runStreamScenario(undefined)
        const events = frames.map((frame) => frame.event)
        if (events.at(-1) !== 'result')
          throw new Error(
            `The stream did not end in a result: ${events.join(' ')}`,
          )
        if (events.filter((event) => event === 'result').length !== 1)
          throw new Error('The stream carried more than one result')
        if (events.slice(0, -1).some((event) => event !== 'stage'))
          throw new Error(
            `Unexpected event before the result: ${events.join(' ')}`,
          )
      },
    )
    await t.step(
      'the terminal event is the ask envelope, unchanged',
      async () => {
        const { frames } = await runStreamScenario(undefined)
        const result = frames.at(-1)?.data
        if (result?.['action'] !== 'ask')
          throw new Error('The terminal envelope did not carry the ask action')
        if (
          result['buildId'] !== 'build-test' ||
          result['requestId'] !== 'request-test'
        )
          throw new Error('The terminal envelope lost its protocol fields')
        const data = result['data'] as {
          claims: unknown[]
          citations: unknown[]
        }
        if (!data.claims.length || !data.citations.length)
          throw new Error('The terminal envelope carried no cited claim')
      },
    )
    await t.step('no stage frame carries the answer prose', async () => {
      const { frames } = await runStreamScenario(undefined)
      const answer = (frames.at(-1)?.data['data'] ?? {}) as {
        claims: { text: string }[]
        citations: { quote: string }[]
      }
      for (const frame of frames.slice(0, -1)) {
        const serialised = JSON.stringify(frame.data)
        for (const claim of answer.claims)
          if (serialised.includes(claim.text))
            throw new Error(`Stage frame disclosed claim text`)
        for (const citation of answer.citations)
          if (serialised.includes(citation.quote))
            throw new Error(`Stage frame disclosed a passage quotation`)
      }
    })
  },
)
