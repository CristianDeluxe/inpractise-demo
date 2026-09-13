import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(
    async () => import('@/public/LandingPage'),
    'LandingPage',
  ),
})
