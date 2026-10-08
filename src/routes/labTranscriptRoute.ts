import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const labTranscriptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lab/transcripts/$id',
  component: lazyRouteComponent(
    async () => import('@/transcripts/pages/TranscriptReviewPage'),
    'TranscriptReviewPage',
  ),
})
