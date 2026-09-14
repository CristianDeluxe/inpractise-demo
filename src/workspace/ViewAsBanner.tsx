import { useWorkspace } from './hooks/useWorkspace'

export function ViewAsBanner() {
  const { access, viewMode } = useWorkspace()
  if (viewMode === 'full') return null
  const real = access?.realPrincipal ?? access
  return (
    <p
      role="status"
      className="border-b border-primary/30 bg-accent px-6 py-3 text-sm text-accent-foreground"
    >
      This view is restricted on purpose to member access
      {access?.premium ? ' with premium' : ' without premium'}. Your account is
      unchanged: {real?.role}, {real?.premium ? 'premium' : 'standard'}.
    </p>
  )
}
