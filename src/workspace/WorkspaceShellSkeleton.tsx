import { Wordmark } from '@/components/Wordmark'

/**
 * Mirrors the workspace shell while access is being confirmed, so a reload keeps the same geometry instead of dropping to a bare page.
 * It carries no evidence and no role information: only the frame.
 */
export function WorkspaceShellSkeleton() {
  return (
    <div
      role="status"
      aria-label="Confirming workspace access"
      className="app-shell min-h-full lg:grid lg:grid-cols-[14.5rem_minmax(0,1fr)]"
    >
      <div className="hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:block">
        <aside className="sticky top-0 flex h-dvh flex-col">
          <div className="border-b border-sidebar-border px-5 py-4">
            <Wordmark />
          </div>
          <div className="flex-1 space-y-2 p-3">
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted/70" />
            <div className="h-9 rounded-md bg-muted/50" />
          </div>
        </aside>
      </div>
      <div className="min-w-0">
        <div className="h-12 border-b border-border bg-card" />
        <div className="mx-auto max-w-[1600px] animate-pulse px-6 py-8 lg:px-10 xl:px-14">
          <div className="h-3 w-40 bg-muted" />
          <div className="mt-5 h-8 w-2/3 max-w-xl bg-muted" />
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
