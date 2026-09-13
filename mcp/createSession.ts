import type { McpConfig } from './McpConfig.ts'
import type { ResearchSession } from './ResearchSession.ts'
import { signIn } from './signIn.ts'

export async function createSession(
  config: McpConfig,
): Promise<ResearchSession> {
  return { config, token: await signIn(config) }
}
