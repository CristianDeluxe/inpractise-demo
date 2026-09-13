import { createRoute, redirect } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const debugAliasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app/diagnostics',
  beforeLoad: () => {
    return redirect({ to: '/inspect', hash: '' })
  },
})
