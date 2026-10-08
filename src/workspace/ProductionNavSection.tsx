import { Link } from '@tanstack/react-router'
import { AudioLines, Brain, Coins } from 'lucide-react'
import { WorkspaceNavSection } from './WorkspaceNavSection'

export function ProductionNavSection() {
  return (
    <WorkspaceNavSection label="Production">
      <Link to="/app/transcripts" className="workspace-link">
        <AudioLines size={16} strokeWidth={1.5} aria-hidden="true" />{' '}
        Transcripts
      </Link>
      <Link to="/app/memory" className="workspace-link">
        <Brain size={16} strokeWidth={1.5} aria-hidden="true" /> Learned memory
      </Link>
      <Link to="/app/cost" className="workspace-link">
        <Coins size={16} strokeWidth={1.5} aria-hidden="true" /> Cost
      </Link>
    </WorkspaceNavSection>
  )
}
