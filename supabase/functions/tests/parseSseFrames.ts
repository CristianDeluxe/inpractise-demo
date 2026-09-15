/** Splits an event-stream body into its `[event, data]` pairs. */
export function parseSseFrames(body: string) {
  return body
    .split('\n\n')
    .filter((frame) => frame.trim().length > 0)
    .map((frame) => {
      const event = /^event: (.+)$/m.exec(frame)?.[1]
      const data = /^data: (.+)$/m.exec(frame)?.[1]
      if (!event || !data) throw new Error(`Malformed frame: ${frame}`)
      return { event, data: JSON.parse(data) as Record<string, unknown> }
    })
}
