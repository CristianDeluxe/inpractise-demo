import { useViewAsSelector } from './hooks/useViewAsSelector'

export function ViewAsSelector() {
  const { id, access, viewMode, setViewMode } = useViewAsSelector()
  const real = access?.realPrincipal ?? access
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-xs font-medium">
        View as
      </label>
      <select
        id={id}
        value={viewMode}
        className="mt-2 w-full min-w-0 rounded border border-sidebar-border bg-sidebar p-2 text-xs text-sidebar-foreground"
        onChange={(event) => {
          const value = event.target.value
          if (
            value === 'full' ||
            value === 'basic-member' ||
            value === 'member'
          )
            setViewMode(value)
        }}
      >
        <option value="full">
          Full access ({real?.role}, {real?.premium ? 'premium' : 'standard'})
        </option>
        <option value="basic-member">Member without premium</option>
        <option value="member">Member, no diagnostics</option>
      </select>
    </div>
  )
}
