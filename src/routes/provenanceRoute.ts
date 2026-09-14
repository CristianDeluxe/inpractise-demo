import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const provenanceRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/answer/$requestId',
  component: lazyRouteComponent(
    async () => import('@/provenance/ProvenancePage'),
    'ProvenancePage',
  ),
})
