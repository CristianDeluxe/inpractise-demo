import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const libraryRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/library',
  component: lazyRouteComponent(
    async () => import('@/workspace/LibraryPage'),
    'LibraryPage',
  ),
})
