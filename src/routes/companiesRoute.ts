import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const companiesRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/companies',
  component: lazyRouteComponent(
    async () => import('@/workspace/CompaniesPage'),
    'CompaniesPage',
  ),
})
