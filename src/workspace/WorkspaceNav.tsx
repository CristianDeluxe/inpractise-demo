import { useWorkspace } from '@/workspace/hooks/useWorkspace'
import { Link } from '@tanstack/react-router'
import {
  BookOpen,
  Bookmark,
  Building2,
  FlaskConical,
  MessagesSquare,
  Scale,
} from 'lucide-react'
import { NotebookBadge } from './NotebookBadge'

export function WorkspaceNav() {
  const { access } = useWorkspace()
  return (
    <nav aria-label="Workspace" className="flex flex-wrap gap-2 lg:flex-col">
      <Link
        to="/app"
        activeOptions={{ exact: true }}
        className="workspace-link"
      >
        <Building2 size={16} strokeWidth={1.5} aria-hidden="true" /> Companies
      </Link>
      <Link to="/app/ask" className="workspace-link">
        <MessagesSquare size={16} strokeWidth={1.5} aria-hidden="true" /> Ask
      </Link>
      <Link to="/app/library" className="workspace-link">
        <BookOpen size={16} strokeWidth={1.5} aria-hidden="true" /> Library
      </Link>
      <Link to="/app/notes" className="workspace-link">
        <Bookmark size={16} strokeWidth={1.5} aria-hidden="true" /> Notebook
        <NotebookBadge />
      </Link>
      {access?.role === 'reviewer' ? (
        <Link to="/inspect" className="workspace-link">
          <FlaskConical size={16} strokeWidth={1.5} aria-hidden="true" />{' '}
          Diagnostics
        </Link>
      ) : null}
      <Link to="/app/standards" className="workspace-link">
        <Scale size={16} strokeWidth={1.5} aria-hidden="true" /> Research
        standards
      </Link>
    </nav>
  )
}
