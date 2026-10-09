import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { loginSearchSchema } from './loginSearchSchema'
import { runtimeRoute } from './runtimeRoute'

export const loginRoute = createRoute({
  getParentRoute: () => runtimeRoute,
  path: '/login',
  validateSearch: loginSearchSchema,
  component: lazyRouteComponent(
    async () => import('@/auth/LoginPage'),
    'LoginPage',
  ),
})
