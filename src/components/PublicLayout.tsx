import type { PublicLayoutProps } from './PublicLayoutProps'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
