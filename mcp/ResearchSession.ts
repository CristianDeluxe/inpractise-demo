import type { McpConfig } from './McpConfig.ts'

/** One member's live session. The token is refreshed in place, never exposed
 *  to a tool caller. */
export type ResearchSession = {
  config: McpConfig
  token: string
}
