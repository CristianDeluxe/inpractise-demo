import { useWorkspace } from '@/workspace/hooks/useWorkspace'
import { Link } from '@tanstack/react-router'
import { FlaskConical, Scale } from 'lucide-react'

/** Collapsed by default: engineering tools are not part of the daily path. */
export function EngineeringNavSection() {
  const { access } = useWorkspace()
  return (
    <details aria-label="Engineering">
      <summary className="eyebrow cursor-pointer px-3 text-sidebar-foreground/60">
        Engineering
      </summary>
      <div className="mt-2 flex flex-wrap gap-2 lg:flex-col">
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
      </div>
    </details>
  )
}
