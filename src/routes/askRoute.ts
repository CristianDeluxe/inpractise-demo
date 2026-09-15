import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'
import { companySearchSchema } from './companySearchSchema'

export const askRoute = createRoute({
  getParentRoute: () => accessRoute,
  validateSearch: companySearchSchema,
  path: '/app/ask',
  component: lazyRouteComponent(
    async () => import('@/research/AskPage'),
    'AskPage',
  ),
})
