import { Wordmark } from '@/components/Wordmark'

/**
 * Mirrors the workspace shell while access is being confirmed, so a reload or a
 * view-as change keeps the same geometry instead of dropping to a bare page.
 * It carries no evidence and no role information: only the frame.
 */
export function WorkspaceShellSkeleton() {
  return (
    <div
      role="status"
      aria-label="Confirming workspace access"
      className="min-h-full lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]"
    >
      <aside className="hidden flex-col bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:flex lg:h-dvh">
        <div className="border-b border-sidebar-border p-5">
          <Wordmark />
        </div>
        <div className="flex-1 space-y-2 p-3">
          <div className="h-10 rounded-lg bg-sidebar-accent/60" />
          <div className="h-10 rounded-lg bg-sidebar-accent/40" />
          <div className="h-10 rounded-lg bg-sidebar-accent/30" />
        </div>
      </aside>
      <div className="min-w-0">
        <div className="h-[49px] border-b border-border bg-card" />
        <div className="mx-auto max-w-[1500px] animate-pulse px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-3 w-40 bg-muted" />
          <div className="mt-5 h-9 w-2/3 max-w-xl bg-muted" />
          <div className="mt-5 h-4 w-full max-w-2xl bg-muted" />
          <div className="mt-3 h-4 w-5/6 max-w-xl bg-muted" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="h-64 rounded-lg border border-border bg-card" />
            <div className="h-64 rounded-lg border border-border bg-card" />
          </div>
        </div>
      </div>
    </div>
  )
}
