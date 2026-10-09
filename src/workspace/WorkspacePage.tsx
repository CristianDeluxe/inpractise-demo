import type { WorkspacePageProps } from './WorkspacePageProps'

/** One container and one header for every page of the signed-in workspace. */
export function WorkspacePage({
  eyebrow,
  title,
  intro,
  note,
  children,
}: WorkspacePageProps) {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-[1600px] px-6 py-6 lg:px-10 xl:px-14"
    >
      <header className="mb-6">
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-2 text-balance">{title}</h1>
        {intro === undefined ? null : (
          <p className="prose-measure mt-3 text-muted-foreground">{intro}</p>
        )}
        {note}
      </header>
      {children}
    </main>
  )
}
