import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const labReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lab/transcripts/$id/report',
  component: lazyRouteComponent(
    async () => import('@/transcripts/pages/TranscriptReportPage'),
    'TranscriptReportPage',
  ),
})
