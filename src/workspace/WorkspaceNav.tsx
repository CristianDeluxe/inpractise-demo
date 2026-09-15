import { useWorkspace } from '@/workspace/hooks/useWorkspace'
import { Link } from '@tanstack/react-router'
import { BookOpen, FlaskConical, LayoutDashboard, Scale } from 'lucide-react'

export function WorkspaceNav() {
  const { access } = useWorkspace()
  return (
    <nav aria-label="Workspace" className="flex flex-wrap gap-2 lg:flex-col">
      <Link
        to="/app"
        activeOptions={{ exact: true }}
        className="workspace-link"
      >
        <LayoutDashboard size={16} strokeWidth={1.5} aria-hidden="true" />{' '}
        Overview
      </Link>
      <Link to="/app/library" className="workspace-link">
        <BookOpen size={16} strokeWidth={1.5} aria-hidden="true" /> Library
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
