import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'
import { companySearchSchema } from './companySearchSchema'

export const libraryRoute = createRoute({
  getParentRoute: () => accessRoute,
  validateSearch: companySearchSchema,
  path: '/app/library',
  component: lazyRouteComponent(
    async () => import('@/workspace/LibraryPage'),
    'LibraryPage',
  ),
})
