import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const labMemoryRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/memory',
  component: lazyRouteComponent(
    async () => import('@/transcripts/pages/MemoryPage'),
    'MemoryPage',
  ),
})
