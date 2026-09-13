import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const workspaceRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app',
  component: lazyRouteComponent(
    async () => import('@/workspace/WorkspacePage'),
    'WorkspacePage',
  ),
})
