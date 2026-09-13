import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const connectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/connect',
  component: lazyRouteComponent(
    async () => import('@/public/ConnectPage'),
    'ConnectPage',
  ),
})
