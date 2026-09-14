// @vitest-environment jsdom
import { citationFixture } from '@/api/citationFixture'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ConflictView } from './ConflictView'

afterEach(() => {
  cleanup()
})

describe('ConflictView', () => {
  it('names each side and keeps its claims together', async () => {
    const citation = {
      ...citationFixture(),
      speaker: 'Dana Ferro (fictional)',
      speakerRole: 'Supplier operations lead',
      interviewDate: '2026-03-04',
    }
    const rootRoute = createRootRoute({
      component: () => (
        <ConflictView
          claims={[
            {
              text: 'Deliveries met the window.',
              citationIds: [citation.citationId],
            },
          ]}
          citations={[citation]}
        />
      ),
    })
    const router = createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory({ initialEntries: ['/'] }),
      defaultPreload: false,
    })
    await router.load()
    render(<RouterProvider router={router} />)
    expect(screen.getByText(/Dana Ferro/u)).toBeDefined()
    expect(screen.getByText(/2026-03-04/u)).toBeDefined()
    expect(screen.getByText('Deliveries met the window.')).toBeDefined()
  })
})
