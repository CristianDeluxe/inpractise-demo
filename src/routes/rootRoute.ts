import { ErrorPage } from '@/app/ErrorPage'
import { NotFoundPage } from '@/app/NotFoundPage'
import { RootLayout } from '@/app/RootLayout'
import { createRootRoute } from '@tanstack/react-router'

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
})
