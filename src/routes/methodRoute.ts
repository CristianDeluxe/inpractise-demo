import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const methodRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/method',
  component: lazyRouteComponent(
    async () => import('@/public/MethodPage'),
    'MethodPage',
  ),
})
