import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const builtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/built',
  component: lazyRouteComponent(
    async () => import('@/public/BuiltPage'),
    'BuiltPage',
  ),
})
