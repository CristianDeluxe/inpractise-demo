import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const labTranscriptsRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/transcripts',
  component: lazyRouteComponent(
    async () => import('@/transcripts/pages/TranscriptListPage'),
    'TranscriptListPage',
  ),
})
