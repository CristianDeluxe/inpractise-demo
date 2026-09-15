import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'
import { companySearchSchema } from './companySearchSchema'

export const compareRoute = createRoute({
  getParentRoute: () => accessRoute,
  validateSearch: companySearchSchema,
  path: '/app/compare',
  component: lazyRouteComponent(
    async () => import('@/compare/ComparePage'),
    'ComparePage',
  ),
})
