import { parseEventFrame } from './parseEventFrame.ts'

/**
 * Yields one parsed frame at a time. A frame may be split across any number of
 * network chunks, so the buffer is drained only on a complete blank line;
 * whatever remains when the body ends is incomplete and discarded, which is why
 * end of stream is never treated as a result.
 */
export async function* readEventStream(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  try {
    for (;;) {
      const chunk = await reader.read()
      if (chunk.done) return
      buffer += decoder.decode(chunk.value, { stream: true })
      let boundary = buffer.indexOf('\n\n')
      while (boundary !== -1) {
        const frame = parseEventFrame(buffer.slice(0, boundary))
        buffer = buffer.slice(boundary + 2)
        if (frame) yield frame
        boundary = buffer.indexOf('\n\n')
      }
    }
  } finally {
    await reader.cancel().catch(() => undefined)
  }
}
