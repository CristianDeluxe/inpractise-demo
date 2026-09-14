import { routeTree } from '@/routes/routeTree'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { RuntimeContext } from '@/runtime/RuntimeContext'
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render } from '@testing-library/react'

export async function renderRouteFixture(
  path: string,
  runtime: BrowserRuntime | null,
) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
    defaultPreload: false,
  })
  await router.load()
  const view = render(
    <RuntimeContext value={runtime}>
      <RouterProvider router={router} />
    </RuntimeContext>,
  )
  return { ...view, router }
}
