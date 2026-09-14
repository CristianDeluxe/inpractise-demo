import { describe, expect, it } from 'vitest'
import { mcpMemberEmail } from '../../mcp/McpMemberEmail.ts'
import { loadMcpConfig } from '../../mcp/loadMcpConfig.ts'
import { directMcpEnvironment } from './directMcpEnvironment.ts'

describe('loadMcpConfig', () => {
  it('uses the dedicated member for the documented three-variable environment', () => {
    expect(loadMcpConfig(directMcpEnvironment)).toEqual({
      url: directMcpEnvironment.RESEARCH_URL,
      publishableKey: directMcpEnvironment.RESEARCH_PUBLISHABLE_KEY,
      email: mcpMemberEmail,
      password: directMcpEnvironment.DEMO_MCP_PASSWORD,
    })
  })

  it('falls back to direct defaults when resolved variables are empty', () => {
    expect(
      loadMcpConfig({
        ...directMcpEnvironment,
        RESEARCH_EMAIL: '',
        RESEARCH_PASSWORD: '',
      }),
    ).toMatchObject({
      email: mcpMemberEmail,
      password: directMcpEnvironment.DEMO_MCP_PASSWORD,
    })
  })

  it('preserves explicit legacy email and password overrides', () => {
    expect(
      loadMcpConfig({
        ...directMcpEnvironment,
        RESEARCH_EMAIL: 'generic-client@example.test',
        RESEARCH_PASSWORD: 'generic-password',
      }),
    ).toMatchObject({
      email: 'generic-client@example.test',
      password: 'generic-password',
    })
  })

  it('prefers a resolved password over the dedicated member password', () => {
    expect(
      loadMcpConfig({ ...directMcpEnvironment, RESEARCH_PASSWORD: 'resolved' }),
    ).toMatchObject({ password: 'resolved' })
  })

  it('rejects an invalid URL', () => {
    expect(() =>
      loadMcpConfig({ ...directMcpEnvironment, RESEARCH_URL: 'nope' }),
    ).toThrow('RESEARCH_URL is not a URL')
  })

  it('rejects an environment with neither password name', () => {
    const { DEMO_MCP_PASSWORD: _dedicatedPassword, ...withoutPassword } =
      directMcpEnvironment
    expect(() => loadMcpConfig(withoutPassword)).toThrow('DEMO_MCP_PASSWORD')
  })
})
