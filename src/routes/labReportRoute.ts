import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const labReportRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/transcripts/$id/report',
  component: lazyRouteComponent(
    async () => import('@/transcripts/pages/TranscriptReportPage'),
    'TranscriptReportPage',
  ),
})
