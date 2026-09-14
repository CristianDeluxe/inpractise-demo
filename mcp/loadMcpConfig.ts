import type { McpConfig } from './McpConfig.ts'
import { mcpMemberEmail } from './McpMemberEmail.ts'

/** Credentials arrive through the environment, never as tool arguments. */
export function loadMcpConfig(env: NodeJS.ProcessEnv): McpConfig {
  const url = env['RESEARCH_URL'] ?? ''
  const publishableKey = env['RESEARCH_PUBLISHABLE_KEY'] ?? ''
  const email = env['RESEARCH_EMAIL'] || mcpMemberEmail
  const password = env['RESEARCH_PASSWORD'] || env['DEMO_MCP_PASSWORD'] || ''
  if (!url || !publishableKey || !password)
    throw new Error(
      'Set RESEARCH_URL, RESEARCH_PUBLISHABLE_KEY and DEMO_MCP_PASSWORD, or RESEARCH_PASSWORD',
    )
  if (!URL.canParse(url)) throw new Error('RESEARCH_URL is not a URL')
  return { url, publishableKey, email, password }
}
