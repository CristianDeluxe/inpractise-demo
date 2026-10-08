import { Link } from '@tanstack/react-router'
import { BookOpen, Bookmark, Building2, MessagesSquare } from 'lucide-react'
import { NotebookBadge } from './NotebookBadge'
import { WorkspaceNavSection } from './WorkspaceNavSection'

export function ResearchNavSection() {
  return (
    <WorkspaceNavSection label="Research">
      <Link
        to="/app"
        activeOptions={{ exact: true }}
        className="workspace-link"
      >
        <BookOpen size={16} strokeWidth={1.5} aria-hidden="true" /> Interviews
      </Link>
      <Link to="/app/ask" className="workspace-link">
        <MessagesSquare size={16} strokeWidth={1.5} aria-hidden="true" /> Ask
      </Link>
      <Link to="/app/companies" className="workspace-link">
        <Building2 size={16} strokeWidth={1.5} aria-hidden="true" /> Companies
      </Link>
      <Link to="/app/notes" className="workspace-link">
        <Bookmark size={16} strokeWidth={1.5} aria-hidden="true" /> Notebook
        <NotebookBadge />
      </Link>
    </WorkspaceNavSection>
  )
}
