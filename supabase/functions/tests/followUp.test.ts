import { followUpScenario } from './followUpScenario.ts'

Deno.test('a follow-up is rewritten before anything is measured', async (t) => {
  const history = [
    {
      question:
        'What is known about Meridian processing revenue in January 2026?',
      answer:
        'One operator reported January processing revenue of 4.1 million.',
    },
  ]
  const rewritten =
    'What is known about Meridian processing revenue in February 2026?'
  await t.step(
    'a first question is used as written and costs no rewrite',
    async () => {
      const { result, completions } = await followUpScenario([], [])
      if (completions.length !== 1)
        throw new Error(
          `Expected one completion, saw ${String(completions.length)}`,
        )
      if (result.resolvedQuery !== 'And in February?')
        throw new Error(
          `Unexpected resolved query: ${String(result.resolvedQuery)}`,
        )
    },
  )
  await t.step(
    'the rewrite asks for one plain line and carries the earlier turn',
    async () => {
      const { completions } = await followUpScenario(history, [
        `  ${rewritten}\n`,
      ])
      if (completions.length !== 2)
        throw new Error(
          `Expected two completions, saw ${String(completions.length)}`,
        )
      const rewrite = (await completions[0]?.clone().json()) as {
        messages: { content: string }[]
        response_format?: unknown
      }
      if (rewrite.response_format !== undefined)
        throw new Error('The rewrite must ask for plain text, not JSON')
      if (!rewrite.messages[1]?.content.includes(history[0]?.question ?? ''))
        throw new Error('The rewrite prompt did not carry the earlier turn')
    },
  )
  await t.step(
    'retrieval, generation and the answer all carry the rewrite',
    async () => {
      const { result, completions, retrieval } = await followUpScenario(
        history,
        [`  ${rewritten}\n`],
      )
      const body = (await retrieval?.clone().json()) as { query_text?: string }
      if (body.query_text !== rewritten)
        throw new Error(`Retrieval ran on: ${String(body.query_text)}`)
      const generation = (await completions[1]?.clone().json()) as {
        messages: { content: string }[]
      }
      if (!generation.messages[1]?.content.startsWith(`Question: ${rewritten}`))
        throw new Error('Generation did not receive the rewritten question')
      if (result.resolvedQuery !== rewritten)
        throw new Error(
          `Resolved query not returned: ${String(result.resolvedQuery)}`,
        )
    },
  )
  await t.step(
    'an empty rewrite is a model failure, not a refusal',
    async () => {
      let failure: unknown
      try {
        await followUpScenario(history, ['   '])
      } catch (error) {
        failure = error
      }
      const code = (failure as { code?: string } | undefined)?.code
      if (code !== 'invalid_model_answer')
        throw new Error(`Expected invalid_model_answer, saw ${String(code)}`)
    },
  )
})
