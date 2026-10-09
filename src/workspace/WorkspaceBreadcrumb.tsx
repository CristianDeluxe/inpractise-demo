import { useRouterState } from '@tanstack/react-router'
import { breadcrumbTrail } from './breadcrumbTrail'

export function WorkspaceBreadcrumb() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const trail = breadcrumbTrail(pathname)
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-border bg-card text-xs text-muted-foreground print:hidden"
    >
      <ol className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-x-2 px-6 py-3 lg:px-10 xl:px-14">
        {trail.map((part, index) => (
          <li key={part} className="flex items-center gap-x-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            <span
              aria-current={index === trail.length - 1 ? 'page' : undefined}
              className={index === trail.length - 1 ? 'text-foreground' : ''}
            >
              {part}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}
