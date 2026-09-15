import type { LatencyTarget } from './LatencyTarget.ts'
import { parseAskResultFrame } from './parseAskResultFrame.ts'
import { postResearch } from './postResearch.ts'
import { readStreamFrames } from './readStreamFrames.ts'
import type { StreamedAskTiming } from './StreamedAskTiming.ts'

/**
 * Reads the event stream frame by frame and stamps the first stage and the
 * result as they arrive, which is what a reader in front of the rail sees.
 */
export async function timeStreamedAsk(
  target: LatencyTarget,
  token: string,
  body: Record<string, unknown>,
): Promise<StreamedAskTiming> {
  const started = performance.now()
  const response = await postResearch(target, token, { ...body, stream: true })
  if (!response.ok || !response.body)
    throw new Error(`ask failed with ${String(response.status)}`)
  let firstPhaseMs: number | undefined
  for await (const frame of readStreamFrames(response.body)) {
    if (frame.event === 'stage') {
      firstPhaseMs ??= performance.now() - started
      continue
    }
    if (frame.event !== 'result')
      throw new Error(`ask stream ${frame.event}: ${frame.data}`)
    return {
      firstPhaseMs: firstPhaseMs ?? performance.now() - started,
      answerMs: performance.now() - started,
      ...parseAskResultFrame(frame.data),
    }
  }
  throw new Error('ask stream ended without a result')
}
