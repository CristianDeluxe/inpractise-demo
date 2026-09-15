import { askStagesFixture } from './askStagesFixture'

/** An ask answered over an event stream, as the application always asks it. */
export function askStreamFixture(data: unknown) {
  const frames = [
    ...askStagesFixture.map(
      (stage) => `event: stage\ndata: ${JSON.stringify(stage)}\n\n`,
    ),
    `event: result\ndata: ${JSON.stringify({
      action: 'ask',
      data,
      buildId: 'build',
      requestId: 'request',
    })}\n\n`,
  ]
  return new Response(frames.join(''), {
    headers: { 'content-type': 'text/event-stream' },
  })
}
