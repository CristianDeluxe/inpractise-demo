import { investigationStagesFixture } from '@/research/investigationStagesFixture'

/** An investigation answered over an event stream, exactly as the workspace
 * always runs it. */
export function investigateStreamFixture(data: unknown) {
  const frames = [
    ...investigationStagesFixture().map(
      (stage) => `event: stage\ndata: ${JSON.stringify(stage)}\n\n`,
    ),
    `event: result\ndata: ${JSON.stringify({
      action: 'investigate',
      data,
      buildId: 'build',
      requestId: 'request',
    })}\n\n`,
  ]
  return new Response(frames.join(''), {
    headers: { 'content-type': 'text/event-stream' },
  })
}
