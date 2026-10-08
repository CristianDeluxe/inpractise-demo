import type { WorkspaceNavSectionProps } from './WorkspaceNavSectionProps'

export function WorkspaceNavSection({
  label,
  children,
}: WorkspaceNavSectionProps) {
  return (
    <div role="group" aria-label={label}>
      <p className="eyebrow mb-2 px-3 text-sidebar-foreground/60">{label}</p>
      <div className="flex flex-wrap gap-2 lg:flex-col">{children}</div>
    </div>
  )
}
