import { useNotebookCount } from '@/notebook/hooks/useNotebookCount'

/** The caller's own note count, as `me` reported it and this session moved it. */
export function NotebookBadge() {
  const { count } = useNotebookCount()
  if (count === null) return null
  return (
    <span
      aria-label={`${String(count)} saved notes`}
      className="ml-auto rounded-full bg-secondary px-2 font-mono text-xs leading-5 text-muted-foreground"
    >
      {count}
    </span>
  )
}
