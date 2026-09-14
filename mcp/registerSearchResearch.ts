import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { callResearch } from './callResearch.ts'
import type { ResearchSession } from './ResearchSession.ts'
import { searchResearchInput } from './searchResearchInput.ts'
import { toolFailure } from './toolFailure.ts'
import { toolText } from './toolText.ts'

/**
 * Use the member session's research search action, with no separate retrieval
 * index or privileged client. Backend failures remain tool errors rather than
 * empty matches; this tool exposes neither Ask generation nor writes.
 */
export function registerSearchResearch(
  server: McpServer,
  session: ResearchSession,
): void {
  server.registerTool(
    'search_research',
    {
      title: 'Search research evidence',
      description:
        'Returns ranked passages from the research corpus this member may read, each with its immutable citation, source and date. It never returns text the member is not entitled to.',
      inputSchema: searchResearchInput,
    },
    async (args) => {
      try {
        return toolText(
          await callResearch(session, { action: 'search', ...args }),
        )
      } catch (error) {
        return toolFailure(error)
      }
    },
  )
}
