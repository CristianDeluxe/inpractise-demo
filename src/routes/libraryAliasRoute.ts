import { createRoute, redirect } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const libraryAliasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app/library',
  beforeLoad: () => {
    return redirect({ to: '/app', hash: 'library' })
  },
})
