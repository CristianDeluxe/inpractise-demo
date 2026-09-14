import { mcpMemberEmail } from '../../mcp/McpMemberEmail.ts'

export const personas = [
  {
    name: 'demo',
    email: 'me@cristiandeluxe.dev',
    passwordVariable: 'DEMO_PASSWORD',
    orgId: 'org-a',
    role: 'reviewer',
    premium: true,
  },
  {
    name: 'basic',
    email: 'me+basic@cristiandeluxe.dev',
    passwordVariable: 'DEMO_BASIC_PASSWORD',
    orgId: 'org-a',
    role: 'member',
    premium: false,
  },
  {
    name: 'mcp',
    email: mcpMemberEmail,
    passwordVariable: 'DEMO_MCP_PASSWORD',
    orgId: 'org-a',
    role: 'member',
    premium: false,
  },
  {
    name: 'other',
    email: 'me+other@cristiandeluxe.dev',
    passwordVariable: 'DEMO_OTHER_PASSWORD',
    orgId: 'org-b',
    role: 'member',
    premium: false,
  },
] as const
