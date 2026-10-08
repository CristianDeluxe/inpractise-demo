import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'
import { companySearchSchema } from './companySearchSchema'

export const workspaceRoute = createRoute({
  getParentRoute: () => accessRoute,
  validateSearch: companySearchSchema,
  path: '/app',
  component: lazyRouteComponent(
    async () => import('@/workspace/InterviewsPage'),
    'InterviewsPage',
  ),
})
