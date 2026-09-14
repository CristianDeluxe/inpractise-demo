import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const standardsRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/standards',
  component: lazyRouteComponent(
    async () => import('@/workspace/StandardsPage'),
    'StandardsPage',
  ),
})
