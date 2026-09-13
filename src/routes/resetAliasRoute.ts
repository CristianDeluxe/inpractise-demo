import { createRoute, redirect } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const resetAliasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  beforeLoad: () => {
    return redirect({ to: '/login', hash: '' })
  },
})
