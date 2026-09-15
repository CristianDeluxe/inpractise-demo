import { useNotebookCount } from '@/notebook/hooks/useNotebookCount'

/** The caller's own note count, as `me` reported it and this session moved it. */
export function NotebookBadge() {
  const { count } = useNotebookCount()
  if (count === null) return null
  return (
    <span
      aria-label={`${String(count)} saved notes`}
      className="ml-auto rounded-full bg-sidebar-accent px-2 py-0.5 font-mono text-xs"
    >
      {count}
    </span>
  )
}
