import { createRoute, redirect } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const authAliasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  beforeLoad: () => {
    return redirect({ to: '/login', hash: '' })
  },
})
