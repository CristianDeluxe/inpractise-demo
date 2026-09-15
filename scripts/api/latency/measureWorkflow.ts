import { latencyQuestions } from './latencyQuestions.ts'
import { loadLatencyTarget } from './loadLatencyTarget.ts'
import { readTargetOf } from './readTargetOf.ts'
import { repeat } from './repeat.ts'
import { signInReviewer } from './signInReviewer.ts'
import { summariseSamples } from './summariseSamples.ts'
import { timeAction } from './timeAction.ts'
import { timeStreamedAsk } from './timeStreamedAsk.ts'

/**
 * Times the reviewer's workflow against the research endpoint: search, a
 * passage read and the streamed ask (first phase and answer), `count` times
 * each after one discarded warm-up of search and read.
 */
export async function measureWorkflow(count: number) {
  const target = loadLatencyTarget()
  const signInStarted = performance.now()
  const token = await signInReviewer(target)
  const signInMs = Math.round(performance.now() - signInStarted)
  const searchBody = { action: 'search', query: latencyQuestions.search }
  const askBody = { action: 'ask', query: latencyQuestions.ask }
  const warm = await timeAction(target, token, searchBody)
  const readBody = { action: 'read', ...readTargetOf(warm.data) }
  await timeAction(target, token, readBody)
  const searches = await repeat(count, async () =>
    timeAction(target, token, searchBody),
  )
  const reads = await repeat(count, async () =>
    timeAction(target, token, readBody),
  )
  const asks = await repeat(count, async () =>
    timeStreamedAsk(target, token, askBody),
  )
  const serverMs = asks.flatMap((ask) =>
    ask.serverMs === undefined ? [] : [ask.serverMs],
  )
  return {
    measuredAt: new Date().toISOString(),
    endpointHost: new URL(target.endpoint).host,
    persona: 'reviewer',
    sampleSize: count,
    warmupRequests: 1,
    coldSearchMs: Math.round(warm.ms),
    signInMs,
    askStatuses: [...new Set(asks.map((ask) => ask.status))],
    method:
      'Sequential requests from this machine with the reviewer session, mirroring the browser headers. Search and read use the JSON route; ask uses the event stream, stamped at the first stage frame and at the result frame. Percentiles use nearest-rank indexes.',
    metrics: {
      searchMs: summariseSamples(searches.map((sample) => sample.ms)),
      readMs: summariseSamples(reads.map((sample) => sample.ms)),
      askFirstPhaseMs: summariseSamples(asks.map((ask) => ask.firstPhaseMs)),
      askAnswerMs: summariseSamples(asks.map((ask) => ask.answerMs)),
      ...(serverMs.length ? { askServerMs: summariseSamples(serverMs) } : {}),
    },
  }
}
