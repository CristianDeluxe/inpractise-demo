import { useWorkspace } from '@/workspace/hooks/useWorkspace'
import { Link } from '@tanstack/react-router'
import { FlaskConical, Scale } from 'lucide-react'

/** Collapsed by default: engineering tools are not part of the daily path. */
export function EngineeringNavSection() {
  const { access } = useWorkspace()
  return (
    <details aria-label="Engineering">
      <summary className="nav-label cursor-pointer">Engineering</summary>
      <div className="mt-1.5 flex flex-wrap gap-1 lg:flex-col">
        {access?.role === 'reviewer' ? (
          <Link to="/inspect" className="workspace-link">
            <FlaskConical size={16} strokeWidth={1.5} aria-hidden="true" />{' '}
            Diagnostics
          </Link>
        ) : null}
        <Link to="/app/standards" className="workspace-link">
          <Scale size={16} strokeWidth={1.5} aria-hidden="true" /> How quotes
          are checked
        </Link>
      </div>
    </details>
  )
}
