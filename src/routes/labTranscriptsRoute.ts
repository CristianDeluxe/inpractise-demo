import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const labTranscriptsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lab/transcripts',
  component: lazyRouteComponent(
    async () => import('@/transcripts/pages/TranscriptListPage'),
    'TranscriptListPage',
  ),
})
