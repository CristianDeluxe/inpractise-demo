import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerFetchPassage } from './registerFetchPassage.ts'
import { registerSearchResearch } from './registerSearchResearch.ts'
import type { ResearchSession } from './ResearchSession.ts'

/** Exactly two tools. Anything the browser cannot do, this cannot do either. */
export function createServer(session: ResearchSession): McpServer {
  const server = new McpServer({
    name: 'inpractise-demo',
    version: '0.1.0',
  })
  registerSearchResearch(server, session)
  registerFetchPassage(server, session)
  return server
}
