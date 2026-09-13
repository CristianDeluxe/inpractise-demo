import { AccessGate } from '@/auth/AccessGate'
import { createRoute } from '@tanstack/react-router'
import { runtimeRoute } from './runtimeRoute'

export const accessRoute = createRoute({
  getParentRoute: () => runtimeRoute,
  id: 'access',
  component: AccessGate,
})
