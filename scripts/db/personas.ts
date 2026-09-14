import { mcpMemberEmail } from '../../mcp/McpMemberEmail.ts'

export const personas = [
  {
    name: 'basic',
    email: 'info+inpractise-basic@busirocket.com',
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
    name: 'premium',
    email: 'info+inpractise-premium@busirocket.com',
    passwordVariable: 'DEMO_PREMIUM_PASSWORD',
    orgId: 'org-a',
    role: 'member',
    premium: true,
  },
  {
    name: 'reviewer',
    email: 'info+inpractise-reviewer@busirocket.com',
    passwordVariable: 'DEMO_REVIEWER_PASSWORD',
    orgId: 'org-a',
    role: 'reviewer',
    premium: false,
  },
  {
    name: 'other',
    email: 'info+inpractise-other@busirocket.com',
    passwordVariable: 'DEMO_OTHER_PASSWORD',
    orgId: 'org-b',
    role: 'member',
    premium: false,
  },
] as const
