import { vi } from 'vitest'
import { z } from 'zod'
import { createFacade } from '../../server/api/createFacade.ts'
import type { FacadeConfig } from '../../server/api/FacadeConfig.ts'
import { backendDataFixture } from './backendDataFixture.ts'

export function facadeFixture(overrides: Partial<FacadeConfig> = {}) {
  const transport = vi.fn<typeof fetch>(async (_url, init) => {
    const { action } = z
      .object({ action: z.string() })
      .parse(JSON.parse(typeof init?.body === 'string' ? init.body : '{}'))
    return Promise.resolve(
      Response.json(
        {
          action,
          data: backendDataFixture(action),
          requestId: 'backend-id',
          buildId: 'fixture',
        },
        { headers: { 'x-research-org-id': 'demo-org' } },
      ),
    )
  })
  const config = {
    researchUrl: 'http://fixture.invalid/functions/v1/research',
    fetch: transport,
    limit: 60,
    windowSeconds: 60,
    maxPrincipals: 10,
    now: () => 0,
    ...overrides,
  }
  return { handle: createFacade(config), transport, config }
}
