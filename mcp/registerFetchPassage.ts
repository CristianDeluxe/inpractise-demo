import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { callResearch } from './callResearch.ts'
import { fetchPassageInput } from './fetchPassageInput.ts'
import type { ResearchSession } from './ResearchSession.ts'
import { toolFailure } from './toolFailure.ts'
import { toolText } from './toolText.ts'

export function registerFetchPassage(
  server: McpServer,
  session: ResearchSession,
): void {
  server.registerTool(
    'fetch_passage',
    {
      title: 'Fetch one research passage',
      description:
        'Returns one whole passage with its citation and the IDs of its neighbours. A passage this member may not read is reported as not found, with no title hint.',
      inputSchema: fetchPassageInput,
    },
    async (args) => {
      try {
        return toolText(
          await callResearch(session, { action: 'read', ...args }),
        )
      } catch (error) {
        return toolFailure(error)
      }
    },
  )
}
