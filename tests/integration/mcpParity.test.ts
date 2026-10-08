import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadTarget } from '../../scripts/db/loadTarget.ts'
import { signInPersona } from '../../scripts/db/signInPersona.ts'
import { connectMcpClient } from '../helpers/connectMcpClient.ts'
import { localLexicalTransport } from '../helpers/localLexicalTransport.ts'
import { mcpSession } from '../helpers/mcpSession.ts'
import { mcpToolText } from '../helpers/mcpToolText.ts'
import type { ResearchErrorBody } from '../helpers/ResearchErrorBody.ts'
import type { SearchParityData } from '../helpers/SearchParityData.ts'
import type { SearchParityResponse } from '../helpers/SearchParityResponse.ts'
import { hiddenPassageRef } from './hiddenPassageRef.ts'
import { podcastPassageRef } from './podcastPassageRef.ts'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('MCP and browser parity for equivalent basic-tier principals', () => {
  it('exposes exactly the two documented tools', async () => {
    const client = await connectMcpClient(await mcpSession('mcp'))
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

  it('denies a hidden synthetic-interview passage through both paths', async () => {
    const target = loadTarget()
    const { token } = await signInPersona(target, 'basic')
    const browser = await fetch(`${target.url}/functions/v1/research`, {
      method: 'POST',
      headers: {
        apikey: target.publishableKey,
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ action: 'read', ...hiddenPassageRef }),
    })
    const browserBody = (await browser.json()) as ResearchErrorBody
    expect([browser.status, browserBody.error?.code]).toEqual([
      404,
      'not_found',
    ])

    const client = await connectMcpClient(await mcpSession('mcp'))
    const denied = await client.callTool({
      name: 'fetch_passage',
      arguments: hiddenPassageRef,
    })
    expect(denied.isError).toBe(true)
    expect(mcpToolText(denied)).toMatch(/^not_found:/)
    expect(mcpToolText(denied)).not.toMatch(/Northstar/i)
    await client.close()
  }, 60000)

  it('returns the same podcast passage through both paths', async () => {
    const target = loadTarget()
    const { token } = await signInPersona(target, 'basic')
    const browser = await fetch(`${target.url}/functions/v1/research`, {
      method: 'POST',
      headers: {
        apikey: target.publishableKey,
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ action: 'read', ...podcastPassageRef }),
    })
    expect(browser.status).toBe(200)
    const client = await connectMcpClient(await mcpSession('mcp'))
    const allowed = await client.callTool({
      name: 'fetch_passage',
      arguments: podcastPassageRef,
    })
    expect(allowed.isError).toBeFalsy()
    expect(mcpToolText(allowed)).toMatch(/Swiss francs/)
    await client.close()
  }, 60000)

  it('returns identical lexical evidence through the local handler and MCP with live RLS', async () => {
    const target = loadTarget()
    const { token } = await signInPersona(target, 'basic')
    vi.stubGlobal('fetch', localLexicalTransport(target, globalThis.fetch))
    const request = {
      action: 'search',
      query: 'billion Swiss francs research development',
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
    const browserBody = (await browser.json()) as SearchParityResponse
    const client = await connectMcpClient(await mcpSession('mcp'))
    const viaMcp = await client.callTool({
      name: 'search_research',
      arguments: {
        query: 'billion Swiss francs research development',
        limit: 5,
      },
    })
    const mcpData = JSON.parse(mcpToolText(viaMcp)) as SearchParityData
    expect([browserBody.data.mode, mcpData.mode]).toEqual([
      'lexical_only',
      'lexical_only',
    ])
    expect(browserBody.data.items.length).toBeGreaterThan(0)
    expect(mcpData.items.map((item) => item.citationId)).toEqual(
      browserBody.data.items.map((item) => item.citationId),
    )
    await client.close()
  }, 60000)
})
