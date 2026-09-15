import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const askRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/ask',
  component: lazyRouteComponent(
    async () => import('@/research/AskPage'),
    'AskPage',
  ),
})
