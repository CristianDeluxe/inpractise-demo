/** Yields each event-stream frame's name and raw data line as it arrives. */
export async function* readStreamFrames(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  for (;;) {
    const chunk = await reader.read()
    if (chunk.done) return
    buffer += decoder.decode(chunk.value, { stream: true })
    let boundary = buffer.indexOf('\n\n')
    while (boundary !== -1) {
      const frame = buffer.slice(0, boundary)
      buffer = buffer.slice(boundary + 2)
      boundary = buffer.indexOf('\n\n')
      const event = /^event: (.+)$/m.exec(frame)?.[1]
      const data = /^data: (.+)$/m.exec(frame)?.[1]
      if (event && data !== undefined) yield { event, data }
    }
  }
}
