import { createRoute, lazyRouteComponent } from '@tanstack/react-router'
import { accessRoute } from './accessRoute'

export const notesRoute = createRoute({
  getParentRoute: () => accessRoute,
  path: '/app/notes',
  component: lazyRouteComponent(
    async () => import('@/notebook/NotebookPage'),
    'NotebookPage',
  ),
})
