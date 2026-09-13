import { describe, expect, it } from 'vitest'
import { loadTarget } from '../../scripts/db/loadTarget.ts'
import { signInPersona } from '../../scripts/db/signInPersona.ts'
import { connectMcpClient } from '../helpers/connectMcpClient.ts'
import { mcpSession } from '../helpers/mcpSession.ts'
import { mcpToolText } from '../helpers/mcpToolText.ts'
import { premiumPassageRef } from '../helpers/premiumPassageRef.ts'

describe('MCP and browser parity for one principal', () => {
  it('exposes exactly the two documented tools', async () => {
    const client = await connectMcpClient(await mcpSession('basic'))
    const tools = await client.listTools()
    expect(tools.tools.map((tool) => tool.name).sort()).toEqual([
      'fetch_passage',
      'search_research',
    ])
    for (const tool of tools.tools)
      expect(Object.keys(tool.inputSchema.properties ?? {})).not.toContain(
        'orgId',
      )
    await client.close()
  }, 60000)

  it('denies the basic member the premium passage through both paths', async () => {
    const target = loadTarget()
    const { token } = await signInPersona(target, 'basic')
    const browser = await fetch(`${target.url}/functions/v1/research`, {
      method: 'POST',
      headers: {
        apikey: target.publishableKey,
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ action: 'read', ...premiumPassageRef }),
    })
    const browserBody = (await browser.json()) as {
      error?: { code?: string }
    }
    expect([browser.status, browserBody.error?.code]).toEqual([
      404,
      'not_found',
    ])

    const client = await connectMcpClient(await mcpSession('basic'))
    const denied = await client.callTool({
      name: 'fetch_passage',
      arguments: premiumPassageRef,
    })
    expect(denied.isError).toBe(true)
    expect(mcpToolText(denied)).toMatch(/^not_found:/)
    expect(mcpToolText(denied)).not.toMatch(/ORCHID-74/)
    await client.close()
  }, 60000)

  it('returns the premium passage to the premium member through MCP', async () => {
    const client = await connectMcpClient(await mcpSession('premium'))
    const allowed = await client.callTool({
      name: 'fetch_passage',
      arguments: premiumPassageRef,
    })
    expect(allowed.isError).toBeFalsy()
    expect(mcpToolText(allowed)).toMatch(/ORCHID-74/)
    await client.close()
  }, 60000)

  it('returns the same authorised evidence to search through both paths', async () => {
    const target = loadTarget()
    const { token } = await signInPersona(target, 'basic')
    const request = {
      action: 'search',
      query: 'Harbor June deliveries',
      limit: 5,
    }
    const browser = await fetch(`${target.url}/functions/v1/research`, {
      method: 'POST',
      headers: {
        apikey: target.publishableKey,
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(request),
    })
    const browserBody = (await browser.json()) as {
      data: { items: { citationId: string }[] }
    }
    const client = await connectMcpClient(await mcpSession('basic'))
    const viaMcp = await client.callTool({
      name: 'search_research',
      arguments: { query: 'Harbor June deliveries', limit: 5 },
    })
    const mcpData = JSON.parse(mcpToolText(viaMcp)) as {
      items: { citationId: string }[]
    }
    expect(mcpData.items.map((item) => item.citationId)).toEqual(
      browserBody.data.items.map((item) => item.citationId),
    )
    await client.close()
  }, 60000)
})
