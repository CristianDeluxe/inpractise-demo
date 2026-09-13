import { useAppRuntime } from '@/app/hooks/useAppRuntime'
import { router } from '@/routes/router'
import { RuntimeContext } from '@/runtime/RuntimeContext'
import { RouterProvider } from '@tanstack/react-router'

export function ConfiguredApp() {
  const runtime = useAppRuntime()
  return (
    <RuntimeContext value={runtime}>
      <RouterProvider router={router} />
    </RuntimeContext>
  )
}
