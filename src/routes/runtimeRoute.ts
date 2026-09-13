import { RuntimeGate } from '@/app/RuntimeGate'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const runtimeRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'runtime',
  component: RuntimeGate,
})
