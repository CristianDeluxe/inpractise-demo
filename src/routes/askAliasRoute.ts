import { createRoute, redirect } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const askAliasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app/ask',
  beforeLoad: () => {
    return redirect({ to: '/app', hash: 'research' })
  },
})
