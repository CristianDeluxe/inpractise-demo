import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const costRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/cost',
  component: lazyRouteComponent(
    async () => import('@/cost/CostPage'),
    'CostPage',
  ),
})
