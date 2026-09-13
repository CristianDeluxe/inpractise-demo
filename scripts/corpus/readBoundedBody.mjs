export async function readBoundedBody(response, maxBytes) {
  if (Number(response.headers.get('content-length')) > maxBytes) {
    await response.body?.cancel()
    throw new Error('RESPONSE_TOO_LARGE')
  }
  const chunks = []
  let bytes = 0
  for await (const chunk of response.body) {
    bytes += chunk.length
    if (bytes > maxBytes) throw new Error('RESPONSE_TOO_LARGE')
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}
