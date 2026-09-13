import { createSession } from '../../mcp/createSession.ts'
import type { ResearchSession } from '../../mcp/ResearchSession.ts'
import { loadTarget } from '../../scripts/db/loadTarget.ts'
import { personas } from '../../scripts/db/personas.ts'

/** The MCP server signs in as an ordinary member with a password, exactly as
 *  it does when Claude Code launches it. */
export async function mcpSession(name: string): Promise<ResearchSession> {
  const target = loadTarget()
  const persona = personas.find((item) => item.name === name)
  if (!persona) throw new Error('Unknown persona')
  const password = target.values[persona.passwordVariable]
  if (!password) throw new Error(`Missing ${persona.passwordVariable}`)
  return createSession({
    url: target.url,
    publishableKey: target.publishableKey,
    email: persona.email,
    password,
  })
}
