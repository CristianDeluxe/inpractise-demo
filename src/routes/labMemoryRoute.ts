import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const labMemoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lab/memory',
  component: lazyRouteComponent(
    async () => import('@/transcripts/pages/MemoryPage'),
    'MemoryPage',
  ),
})
