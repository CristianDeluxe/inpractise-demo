import { DemoNotice } from '@/components/DemoNotice'
import { Outlet } from '@tanstack/react-router'

export function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="flex min-h-dvh flex-col [&>*:last-child]:flex-1">
        <DemoNotice />
        <Outlet />
      </div>
    </>
  )
}
