import { compareStagesFixture } from './compareStagesFixture'

/** A cross-reference answered over an event stream, as the application always requests it. */
export function compareStreamFixture(data: unknown) {
  const frames = [
    ...compareStagesFixture.map(
      (stage) => `event: stage\ndata: ${JSON.stringify(stage)}\n\n`,
    ),
    `event: result\ndata: ${JSON.stringify({
      action: 'compare',
      data,
      buildId: 'build',
      requestId: 'request',
    })}\n\n`,
  ]
  return new Response(frames.join(''), {
    headers: { 'content-type': 'text/event-stream' },
  })
}
