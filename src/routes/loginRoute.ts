import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { runtimeRoute } from './runtimeRoute'

export const loginRoute = createRoute({
  getParentRoute: () => runtimeRoute,
  path: '/login',
  component: lazyRouteComponent(
    async () => import('@/auth/LoginPage'),
    'LoginPage',
  ),
})
