import { once } from 'node:events'
import { createServer } from 'node:http'
import { createApiListener } from '../../server/api/createApiListener.ts'

export async function withNodeApi(
  run: (url: string) => Promise<void>,
): Promise<void> {
  const listener = createApiListener()
  const server = createServer((request, response) => {
    void listener(request, response)
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  try {
    const address = server.address()
    if (!address || typeof address === 'string')
      throw new Error('Missing test listener address')
    await run(`http://127.0.0.1:${String(address.port)}`)
  } finally {
    server.closeAllConnections()
    server.close()
    await once(server, 'close')
  }
}
