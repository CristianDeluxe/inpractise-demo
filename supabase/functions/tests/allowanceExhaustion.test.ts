import { runExhaustedAsk } from './runExhaustedAsk.ts'

Deno.test(
  'an exhausted Ask stops before retrieval or provider work',
  async () => {
    await runExhaustedAsk([])
  },
)

Deno.test(
  'an exhausted follow-up stops before the question rewrite',
  async () => {
    const providerCalls: string[] = []
    const originalFetch = globalThis.fetch
    globalThis.fetch = async (input) => {
      providerCalls.push(new Request(input).url)
      return await Promise.reject(new Error('Provider called after exhaustion'))
    }
    try {
      await runExhaustedAsk([{ question: 'earlier', answer: 'earlier answer' }])
      await new Promise((resolve) => setTimeout(resolve, 0))
    } finally {
      globalThis.fetch = originalFetch
    }
    if (providerCalls.length !== 0)
      throw new Error(`Provider called: ${providerCalls.join(', ')}`)
  },
)
