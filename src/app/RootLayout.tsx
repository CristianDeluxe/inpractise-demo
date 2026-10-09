import { Outlet } from '@tanstack/react-router'
import { usePageBeacon } from './hooks/usePageBeacon'

export function RootLayout() {
  usePageBeacon()
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="flex min-h-dvh flex-col [&>*:last-child]:flex-1">
        <Outlet />
      </div>
    </>
  )
}
