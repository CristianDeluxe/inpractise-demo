import type { WorkspaceNavSectionProps } from './WorkspaceNavSectionProps'

export function WorkspaceNavSection({
  label,
  children,
}: WorkspaceNavSectionProps) {
  return (
    <div role="group" aria-label={label}>
      <p className="nav-label mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1 lg:flex-col">{children}</div>
    </div>
  )
}
