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
      className="mx-auto w-full max-w-[1600px] px-6 py-8 lg:px-10 xl:px-14"
    >
      <header className="mb-8">
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-3 text-balance text-3xl md:text-4xl">{title}</h1>
        {intro === undefined ? null : (
          <p className="prose-measure mt-4 text-base text-muted-foreground">
            {intro}
          </p>
        )}
        {note}
      </header>
      {children}
    </main>
  )
}
