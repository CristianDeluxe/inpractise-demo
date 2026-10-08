import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const labTranscriptRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/transcripts/$id',
  component: lazyRouteComponent(
    async () => import('@/transcripts/pages/TranscriptReviewPage'),
    'TranscriptReviewPage',
  ),
})
