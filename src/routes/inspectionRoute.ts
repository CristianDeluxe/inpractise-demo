import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const inspectionRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/inspect',
  component: lazyRouteComponent(
    async () => import('@/inspection/InspectionPage'),
    'InspectionPage',
  ),
})
