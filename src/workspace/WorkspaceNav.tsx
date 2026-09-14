import { useWorkspace } from '@/workspace/hooks/useWorkspace'
import { Link } from '@tanstack/react-router'
import { BookOpen, FlaskConical, Search } from 'lucide-react'

export function WorkspaceNav() {
  const { access } = useWorkspace()
  return (
    <nav aria-label="Workspace" className="flex flex-wrap gap-2 lg:flex-col">
      <Link to="/app" hash="library" className="workspace-link">
        <BookOpen size={16} strokeWidth={1.5} aria-hidden="true" /> Library
      </Link>
      <Link to="/app" hash="research" className="workspace-link">
        <Search size={16} strokeWidth={1.5} aria-hidden="true" /> Research
        workspace
      </Link>
      {access?.role === 'reviewer' ? (
        <Link to="/inspect" className="workspace-link">
          <FlaskConical size={16} strokeWidth={1.5} aria-hidden="true" />{' '}
          Diagnostics
        </Link>
      ) : null}
      <Link to="/method" className="workspace-link">
        Research standards
      </Link>
    </nav>
  )
}
