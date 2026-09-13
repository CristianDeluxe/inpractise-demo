import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createServer } from './createServer.ts'
import { createSession } from './createSession.ts'
import { loadMcpConfig } from './loadMcpConfig.ts'
import { recordHandshake } from './recordHandshake.ts'

/** stdout carries the protocol and nothing else; diagnostics go to stderr. */
export async function start(): Promise<void> {
  const session = await createSession(loadMcpConfig(process.env))
  const transport = new StdioServerTransport()
  recordHandshake(transport, process.env['RESEARCH_HANDSHAKE_LOG'])
  await createServer(session).connect(transport)
  process.stderr.write('research-evidence MCP server ready\n')
}

await start()
