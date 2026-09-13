import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const readerRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/read/$documentId/$revisionId/$passageId',
  component: lazyRouteComponent(
    async () => import('@/reader/ReaderPage'),
    'ReaderPage',
  ),
})
