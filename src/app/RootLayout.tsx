import { DemoNotice } from '@/components/DemoNotice'
import { Outlet } from '@tanstack/react-router'

export function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <DemoNotice />
      <Outlet />
    </>
  )
}
