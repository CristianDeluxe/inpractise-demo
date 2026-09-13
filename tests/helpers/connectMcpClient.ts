import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { createServer } from '../../mcp/createServer.ts'
import type { ResearchSession } from '../../mcp/ResearchSession.ts'

/** Connects a real MCP client to the real server over an in-memory pair, so
 *  the test exercises the protocol rather than the handlers directly. */
export async function connectMcpClient(
  session: ResearchSession,
): Promise<Client> {
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair()
  const client = new Client({ name: 'parity-test', version: '0.1.0' })
  await Promise.all([
    createServer(session).connect(serverTransport),
    client.connect(clientTransport),
  ])
  return client
}
